import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Configurar o nome do usuário logado
    this.username = this.authService.isAuthenticated() ? 'Admin' : '';

    // Configurar itens do menubar
    this.items = [
      {
        label: this.username,
        icon: 'pi pi-user',
        visible: !!this.username
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout(): void {
    this.authService.logout();
    this.username = null; // Limpar o nome do usuário ao deslogar
  }
}