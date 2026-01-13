import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ToggleService {

    private isSidebarToggled = new BehaviorSubject<boolean>(true);
    get isSidebarToggled$() {
        return this.isSidebarToggled.asObservable();
    }
    toggle() {
        // localStorage.setItem('toggle', this.isSidebarToggled.value)
        this.isSidebarToggled.next(!this.isSidebarToggled.value);
    }

    async notyInfo( titulo: string, text: string, callback: boolean, img: string ) {
        var notification;
        if (!("Notification" in window)) {
            Swal.fire('Información...', 'Este navegador no soporta notificaciones de escritorio', 'error');
        } else if (Notification.permission === "granted") {
            const options: NotificationOptions = {
                body: text,
                icon: "https://strauss.ai/dashboards/static/images/cropped-favicon2-32x32.png",
                dir: "ltr" as NotificationDirection
            };
            
            notification = new Notification(titulo, options);
            notification.addEventListener('click', function(){
                window.open('https://advisers.strauss.ai:9011/');
            });
        } else if (Notification.permission !== 'denied') {
            await Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    const options: NotificationOptions = {
                        body: text,
                        icon: "https://strauss.ai/dashboards/static/images/cropped-favicon2-32x32.png",
                        dir: "ltr"
                    };
                    const notification = new Notification(titulo, options);
                    notification.addEventListener('click', () => {
                        window.open('https://advisers.strauss.ai:9011/');
                    });
                }
            });
        } else {
            console.log('Ninguna de las anteriores');
        }
    
    }

}
export class AppModule {
}
