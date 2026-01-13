import { Component, OnInit, signal, Inject, PLATFORM_ID, Renderer2, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { HandlerService } from '../../../services/handler.service';
import { WorkflowService } from '../../../services/workflows.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ActivatedRoute } from '@angular/router';

// Interfaces y tipos de datos para mayor claridad
interface Position { x: number; y: number; }
interface NodeData { label: string; handlerType: string; config: any; category: string; }
interface Node { id: string; type: string; position: Position; data: NodeData; }
interface Connection { id: string; source: string; target: string; }
interface CurrentLine { sourceId: string; startX: number; startY: number; endX: number; endY: number; }

declare global {
  interface Window {
    __DRAGGED_HANDLER_DATA__: any | null;
  }
}

interface PanelData {
  sourceNode: Node;
  position: Position;
}

@Component({
  selector: 'app-workflow-editor',
  standalone: true,
  imports: [
    MatIconModule, MatFormFieldModule, MatCardModule, MatButtonModule,
    MatInputModule, MatTooltipModule, MatExpansionModule
  ],
  templateUrl: './workflow-editor.html',
  styleUrls: ['./workflow-editor.scss']
})
export class WorkflowEditor implements OnInit, OnDestroy, AfterViewInit {
  // 🧠 Signals for reactive state
  workflow = signal<any | null>({
    name: 'New Workflow',
    workflow: {
      nodes: [],
      connections: []
    }
  });

  handlers = signal<any[]>([]);
  selectedNode = signal<Node | null>(null);

  // ⭐️ Estado de Conexiones
  isDrawing = signal(false);
  currentLine = signal<CurrentLine | null>(null);
  private searchTerm = signal<string>('');
  showAddNodePanel = signal<PanelData | null>(null);

  // 🖱️ Estado de Arrastre de Nodos Existentes
  draggedNode: Node | null = null;
  private dragStartPos: { x: number, y: number } = { x: 0, y: 0 };
  private initialNodePos: Position = { x: 0, y: 0 };

  private draggingHandler: any | null = null;
  private unlistenGlobalMouseMove: (() => void) | null = null;
  private unlistenGlobalMouseUp: (() => void) | null = null;
  @ViewChild('workflowCanvas') workflowCanvasRef!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: CustomizerSettingsService,
    private handlerService: HandlerService,
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.__DRAGGED_HANDLER_DATA__ = null;

      // La lógica de movimiento de arrastre y finalización de conexión
      this.unlistenGlobalMouseMove = this.renderer.listen('document', 'mousemove', (event) => {
        this.handleMouseMove(event);
        this.handleNodeMove(event); // Nuevo manejador de movimiento de nodo
      });

      this.unlistenGlobalMouseUp = this.renderer.listen('document', 'mouseup', (event) => {
        // Detener conexión (si no se soltó en un nodo)
        if (this.isDrawing()) {
          this.checkAndStopConnection(event); // 👈 CAMBIO AQUÍ: Llamamos a la nueva función
          // this.stopConnection(null);
        }
        this.handleNodeDrop(); // Nuevo manejador de finalización de arrastre de nodo
      });
    }
    this.getAllHandlers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.workflow.update(wf => ({ ...wf }));
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.unlistenGlobalMouseMove) {
      this.unlistenGlobalMouseMove();
    }
    if (this.unlistenGlobalMouseUp) {
      this.unlistenGlobalMouseUp();
    }
  }

  // ===============================
  // 🟢 LÓGICA DE CONEXIONES (Existente y mejorada)
  // ===============================

  private getCanvasRect(): DOMRect | null {
    const canvasElement = this.el.nativeElement.querySelector('#workflow-canvas');
    return canvasElement ? canvasElement.getBoundingClientRect() : null;
  }

  private getNodeElement(nodeId: string): HTMLElement | null {
    return document.getElementById(`node-${nodeId}`);
  }

  getOutputPosition(nodeId: string): Position | null {
    const nodeElement = this.getNodeElement(nodeId);
    const canvasRect = this.getCanvasRect();
    if (!nodeElement || !canvasRect) return null;

    const nodeRect = nodeElement.getBoundingClientRect();

    // Punto de salida (Handle derecho, en el centro vertical del nodo)

    const centerX = nodeRect.left + nodeRect.width / 2;
    const centerY = nodeRect.top + nodeRect.height / 2;

    // El handle está posicionado a la derecha del wrapper (80px), a 10px del borde.
    // Borde derecho del wrapper: centerX + 40px. Usamos 1px extra para asegurar que sale del borde.
    const outputX = centerX + (80 / 2) + 1;
    const outputY = centerY;

    // Convertir a coordenadas del canvas
    const x = outputX - canvasRect.left;
    const y = outputY - canvasRect.top;

    return { x, y };
  }


  private getInputPosition(nodeId: string): Position | null {
    const nodeElement = this.getNodeElement(nodeId);
    const canvasRect = this.getCanvasRect();
    if (!nodeElement || !canvasRect) return null;

    const nodeRect = nodeElement.getBoundingClientRect();

    // Punto de entrada (borde izquierdo del ícono, en el centro vertical del nodo)
    const centerX = nodeRect.left + nodeRect.width / 2;
    const centerY = nodeRect.top + nodeRect.height / 2;

    // El borde izquierdo del 'node-icon-wrapper' (80px de ancho) está en: centerX - 40px
    const iconWrapperHalfWidth = 40;

    const inputX = centerX - iconWrapperHalfWidth;
    const inputY = centerY;

    // Convertir a coordenadas del canvas
    const x = inputX - canvasRect.left;
    const y = inputY - canvasRect.top;

    return { x, y };
  }

  getConnectionPath(conn: Connection | CurrentLine): string {
    const isTemp = !('target' in conn);

    // START: Usa la posición de salida (handle derecho)
    const start = isTemp
      ? { x: (conn as CurrentLine).startX, y: (conn as CurrentLine).startY }
      : this.getOutputPosition(conn.source);

    // END: Usa la posición de entrada (borde izquierdo del ícono)
    const end = isTemp
      ? { x: (conn as CurrentLine).endX, y: (conn as CurrentLine).endY }
      : this.getInputPosition(conn.target); // 👈 FIX: Usa la posición de entrada

    if (!start || !end) return '';

    const controlDistance = Math.max(50, Math.abs(end.x - start.x) / 2);

    // Curva de Bézier que sale horizontalmente
    return `M ${start.x} ${start.y} 
				C ${start.x + controlDistance} ${start.y}, 
				  ${end.x - controlDistance} ${end.y}, 
				  ${end.x} ${end.y}`;
  }

  handleMouseDown(event: MouseEvent, sourceNode: Node) {
    if (event.button !== 0) return;

    event.stopPropagation();
    this.draggedNode = sourceNode;
    this.dragStartPos = { x: event.clientX, y: event.clientY };
    this.initialNodePos = { x: sourceNode.position.x, y: sourceNode.position.y };
  }

  handleMouseMove(event: MouseEvent) {
		if (this.isDrawing()) {
			const canvasRect = this.getCanvasRect();
			if (!canvasRect) return;

			const endX = event.clientX - canvasRect.left;
			const endY = event.clientY - canvasRect.top;

			this.currentLine.update(line => {
				if (!line) return null;
				return { ...line, endX, endY };
			});
		}
	}

  /** Lógica para arrastrar el nodo existente. */
  handleNodeMove(event: MouseEvent) {
    if (!this.draggedNode) return;

    const deltaX = event.clientX - this.dragStartPos.x;
    const deltaY = event.clientY - this.dragStartPos.y;

    // Actualizar la posición del nodo arrastrado
    this.draggedNode.position.x = this.initialNodePos.x + deltaX;
    this.draggedNode.position.y = this.initialNodePos.y + deltaY;

    // Forzar una actualización de la señal del workflow para que Angular redibuje el SVG
    this.workflow.update(wf => ({ ...wf }));
  }

  /** Lógica que se ejecuta al soltar el botón del mouse (terminar arrastre o conexión). */
  handleNodeDrop() {
    // Si hay un nodo arrastrado, asumimos que se movió y detenemos el arrastre.
    if (this.draggedNode) {
      this.draggedNode = null;
      this.workflow.update(wf => ({ ...wf })); // Forzar redibujado final
    }
  }

  // Modificamos startConnection para que se inicie al arrastrar *desde* un punto dentro del nodo (e.g. un handle)
  // Pero para simplicidad, lo implementaremos en un **Botón** en el HTML.
  startConnectionFromNode(node: Node) {
        // 🚨 CAMBIO: Usar getOutputPosition
		const startCenter = this.getOutputPosition(node.id);
		if (!startCenter) return;

		this.isDrawing.set(true);
		this.currentLine.set({
			sourceId: node.id,
			startX: startCenter.x,
			startY: startCenter.y,
			endX: startCenter.x,
			endY: startCenter.y,
		});
		this.selectedNode.set(node);
	}

  checkAndStopConnection(event: MouseEvent) {
    if (!this.isDrawing()) return;

    const currentLineData = this.currentLine();
    this.isDrawing.set(false);
    this.currentLine.set(null);

    if (!currentLineData) return;

    // 1. Buscar el elemento del nodo bajo el cursor
    const targetElement = this.renderer.selectRootElement(event.target as HTMLElement, true);
    const targetNodeElement = targetElement.closest('.workflow-node');

    let targetNode: Node | null = null;

    if (targetNodeElement) {
      const targetNodeId = targetNodeElement.id.replace('node-', '');
      targetNode = this.workflow()?.workflow.nodes.find((n: Node) => n.id === targetNodeId) as Node;
    }

    if (targetNode && targetNode.id !== currentLineData.sourceId) {
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        source: currentLineData.sourceId,
        target: targetNode.id,
      };

      // Prevenir conexiones duplicadas
      const wf = this.workflow()?.workflow;
      const exists = wf?.connections.some(
        (c: Connection) =>
          (c.source === newConnection.source && c.target === newConnection.target) ||
          (c.source === newConnection.target && c.target === newConnection.source)
      );

      if (!exists) {
        this.workflow.update(w => {
          if (!w) return w;
          return {
            ...w,
            workflow: {
              ...w.workflow,
              connections: [...w.workflow.connections, newConnection]
            }
          };
        });
      }
    }
  }

  stopConnection(targetNode: Node | null) {
    // Este se mantiene para el caso de soltar el mouse directamente en el handle (que es un nodo)
    if (targetNode) {
      // Simular un evento de mouseup en la posición del nodo para el manejador global
      this.checkAndStopConnection({ target: this.getNodeElement(targetNode.id) } as any);
    }
  }

  deleteNode(nodeId: string) {
    this.workflow.update(wf => {
      if (!wf || !wf.workflow) return wf;
      const updatedNodes = wf.workflow.nodes.filter((n: Node) => n.id !== nodeId);
      const updatedConnections = wf.workflow.connections.filter((c: Connection) =>
        c.source !== nodeId && c.target !== nodeId
      );
      if (this.selectedNode()?.id === nodeId) {
        this.selectedNode.set(null);
      }
      return {
        ...wf,
        workflow: {
          ...wf.workflow,
          nodes: updatedNodes,
          connections: updatedConnections
        }
      };
    });
    console.log(`Nodo ${nodeId} eliminado junto con sus conexiones.`);
  }

  deleteConnection(connectionId: string) {
    this.workflow.update(wf => {
      if (!wf || !wf.workflow) return wf;
      const updatedConnections = wf.workflow.connections.filter((c: Connection) =>
        c.id !== connectionId
      );
      return {
        ...wf,
        workflow: {
          ...wf.workflow,
          connections: updatedConnections
        }
      };
    });
    console.log(`Conexión ${connectionId} eliminada.`);
  }

  onDragStart(event: DragEvent, handler: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    window.__DRAGGED_HANDLER_DATA__ = handler;
    this.draggingHandler = handler;

    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', handler.type);
      event.dataTransfer.effectAllowed = 'copy';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) return;

    const handlerToUse = window.__DRAGGED_HANDLER_DATA__ || this.draggingHandler;
    if (!handlerToUse || !this.workflow() || !this.workflowCanvasRef?.nativeElement) {
      window.__DRAGGED_HANDLER_DATA__ = null;
      return;
    }

    const workflowCanvas = this.workflowCanvasRef.nativeElement;
    const rect = workflowCanvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    this.createNodeInCanvas(handlerToUse, offsetX, offsetY);

    this.draggingHandler = null;
    window.__DRAGGED_HANDLER_DATA__ = null;
  }

  /**
   * 🟢 NUEVO: Añadir nodo con doble clic en la barra lateral.
   * Se añade en el centro del canvas.
   */
  addNodeByDblClick(handlerToUse: any) {
    if (!this.workflowCanvasRef?.nativeElement) return;

    const workflowCanvas = this.workflowCanvasRef.nativeElement;
    const rect = workflowCanvas.getBoundingClientRect();

    // Calcular el centro del canvas para soltar el nodo
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    this.createNodeInCanvas(handlerToUse, centerX, centerY);
  }

  /**
   * 🟢 Función auxiliar para crear un nodo y actualizar el workflow.
   */
  private createNodeInCanvas(handlerToUse: any, x: number, y: number) {
    const newId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'default',
      position: { x: x, y: y },
      data: {
        label: handlerToUse.name,
        handlerType: handlerToUse.type,
        config: {},
        category: handlerToUse.category,
      },
    };

    this.workflow.update(wf => {
      if (!wf || !wf.workflow) return wf;
      const updatedNodes = [...wf.workflow.nodes, newNode];
      return {
        ...wf,
        workflow: { ...wf.workflow, nodes: updatedNodes }
      };
    });

    this.selectedNode.set(newNode);
  }

  getAllHandlers() {
    this.handlerService.getAllHandlers().subscribe({
      next: (data) => {
        console.log('data=>> ', data);
        this.handlers.set(data);
      },
      error: (err) => console.error('Error cargando handlers:', err)
    });
  }

  get categories() {
    const cats = new Set(this.handlers().map(h => h.category || 'Sin categoría'));
    return Array.from(cats);
  }

  getNodesByCategory(cat: string) {
    return this.handlers().filter(n => n.category === cat);
  }



  selectNode(node: Node) {
    // this.selectedNode.set(node);
  }

  // private createAndConnectNode(sourceNode: Node, handlerToUse: any) {
  //   // 1. Calcular la posición del nuevo nodo (200px a la derecha y centrado)
  //   const newPosition: Position = {
  //     x: sourceNode.position.x + 200,
  //     y: sourceNode.position.y
  //   };

  //   // 2. Crear el nuevo nodo
  //   const newId = `node-${Date.now()}`;
  //   const newNode: Node = {
  //     id: newId,
  //     type: 'default',
  //     position: newPosition,
  //     data: {
  //       label: handlerToUse.name,
  //       handlerType: handlerToUse.type,
  //       config: {},
  //       category: handlerToUse.category,
  //     },
  //   };

  //   // 3. Crear la nueva conexión
  //   const newConnection: Connection = {
  //     id: `conn-${Date.now() + 1}`,
  //     source: sourceNode.id,
  //     target: newId,
  //   };

  //   // 4. Actualizar el estado del workflow
  //   this.workflow.update(wf => {
  //     if (!wf || !wf.workflow) return wf;

  //     return {
  //       ...wf,
  //       workflow: {
  //         ...wf.workflow,
  //         nodes: [...wf.workflow.nodes, newNode],
  //         connections: [...wf.workflow.connections, newConnection],
  //       }
  //     };
  //   });

  //   // 5. (Opcional) Seleccionar el nuevo nodo
  // }

  // 🟢 NUEVA LÓGICA DE BÚSQUEDA
  filterHandlers(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value.toLowerCase());
  }

  getFilteredNodesByCategory(cat: string) {
    const term = this.searchTerm();
    // Si no hay término de búsqueda, devolver todos de la categoría
    if (!term) {
      return this.handlers().filter(n => n.category === cat);
    }
    // Filtrar por nombre y categoría
    return this.handlers().filter(n =>
      n.category === cat && n.name.toLowerCase().includes(term)
    );
  }

  dblClickSelectNode(node: Node) {
    if (this.selectedNode()?.id === node.id) {
      this.selectedNode.set(null);
    } else {
      this.selectedNode.set(node);
    }
  }



  // 🟢 Lógica modificada de Añadir Nodo (Muestra Panel de Selección)
  addSuggestedNode(sourceNode: Node) {
    // Calcula una posición cercana al nodo fuente para mostrar el panel
    const panelPosition: Position = {
      x: sourceNode.position.x + 100,
      y: sourceNode.position.y + 50
    };

    // Mostrar el panel de selección en lugar de añadir automáticamente
    this.showAddNodePanel.set({
      sourceNode: sourceNode,
      position: panelPosition
    });
  }


  // 🟢 Función para Seleccionar un Handler desde el Panel y Conectarlo
  selectAndConnectNode(sourceNode: Node, handlerToUse: any) {
    this.showAddNodePanel.set(null);

    // 1. Calcular la posición del nuevo nodo (200px a la derecha y centrado)
    const newPosition: Position = {
      x: sourceNode.position.x + 200,
      y: sourceNode.position.y
    };

    // 2. Crear el nuevo nodo
    const newId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'default',
      position: newPosition,
      data: {
        label: handlerToUse.name,
        handlerType: handlerToUse.type,
        config: {},
        category: handlerToUse.category,
      },
    };

    // 3. Crear la nueva conexión
    const newConnection: Connection = {
      id: `conn-${Date.now() + 1}`,
      source: sourceNode.id,
      target: newId,
    };

    // 4. Actualizar el estado del workflow
    this.workflow.update(wf => {
      if (!wf || !wf.workflow) return wf;
      return {
        ...wf,
        workflow: {
          ...wf.workflow,
          nodes: [...wf.workflow.nodes, newNode],
          connections: [...wf.workflow.connections, newConnection],
        }
      };
    });

    this.selectedNode.set(newNode);
  }

  saveWorkflow() {
    console.log('Guardando workflow:', this.workflow());
  }
}