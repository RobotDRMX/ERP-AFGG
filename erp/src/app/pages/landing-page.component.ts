import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule, DividerModule],
  template: `
    <div class="landing-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">Novedad: Módulo de IA integrado</div>
          <h1>Transforma tu Empresa con <span class="text-gradient">ERP Pro</span></h1>
          <p>La plataforma Cloud nativa diseñada para automatizar tus finanzas, gestionar tu equipo y escalar tus operaciones globales con total confianza.</p>
          <div class="hero-actions">
            <p-button label="Iniciar Prueba Gratuita" icon="pi pi-bolt" routerLink="/auth/register" styleClass="p-button-lg" />
            <p-button label="Ver Demo" icon="pi pi-play" severity="secondary" [outlined]="true" styleClass="p-button-lg" />
          </div>
          <div class="hero-trust">
            <span>Confiado por más de 500+ empresas</span>
            <div class="trust-icons">
               <i class="pi pi-amazon"></i>
               <i class="pi pi-apple"></i>
               <i class="pi pi-microsoft"></i>
               <i class="pi pi-google"></i>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="glass-mockup">
            <div class="mockup-header">
              <div class="circles"><span></span><span></span><span></span></div>
            </div>
            <div class="mockup-body">
              <div class="chart-box"></div>
              <div class="data-rows">
                <div class="row"></div>
                <div class="row"></div>
                <div class="row"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-header text-center mb-8">
          <h2 class="mb-4">Todo lo que necesitas en un solo lugar</h2>
          <p>Herramientas potentes para cada departamento de tu organización.</p>
        </div>

        <div class="grid-auto-fit">
          <div class="feature-card glass-card">
            <div class="feature-icon bg-blue"><i class="pi pi-wallet"></i></div>
            <h3>Finanzas en tiempo real</h3>
            <p>Monitorea tu flujo de caja, egresos y facturación con reportes financieros automáticos.</p>
          </div>

          <div class="feature-card glass-card">
            <div class="feature-icon bg-purple"><i class="pi pi-users"></i></div>
            <h3>Gestión de Talento</h3>
            <p>Control de asistencia, roles jerárquicos y perfiles de usuario avanzados.</p>
          </div>

          <div class="feature-card glass-card">
            <div class="feature-icon bg-orange"><i class="pi pi-shield"></i></div>
            <h3>Seguridad Grado Bancario</h3>
            <p>Tus datos están protegidos con encriptación de extremo a extremo y auditoría detallada.</p>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-banner gradient-primary">
          <div class="stat-item">
            <span class="stat-number">99.9%</span>
            <span class="stat-label">Uptime</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Soporte</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10x</span>
            <span class="stat-label">Productividad</span>
          </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section text-center p-8">
        <div class="glass-card cta-box">
          <h2>¿Listo para dar el siguiente paso?</h2>
          <p class="mb-6">Únete a la revolución de la gestión empresarial moderna.</p>
          <p-button label="Crear mi cuenta ahora" icon="pi pi-user-plus" routerLink="/auth/register" />
        </div>
      </section>
    </div>
  `,
  styles: [`
    .landing-container {
      display: flex;
      flex-direction: column;
      gap: 6rem;
      overflow-x: hidden;
    }

    /* Hero */
    .hero-section {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 4rem;
      padding: 4rem 0;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(99, 102, 241, 0.15);
      color: var(--color-primary-light);
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 2rem;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .hero-content h1 {
      font-size: 4rem;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.04em;
    }

    .text-gradient {
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-content p {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      max-width: 90%;
    }

    .hero-actions {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .hero-trust {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .hero-trust span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
    }

    .trust-icons {
      display: flex;
      gap: 2rem;
      font-size: 1.5rem;
      color: var(--color-text-muted);
      opacity: 0.6;
    }

    /* Mockup */
    .hero-visual {
      display: flex;
      justify-content: center;
      perspective: 1000px;
    }

    .glass-mockup {
      width: 100%;
      height: 400px;
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: rotateY(-15deg) rotateX(10deg);
      overflow: hidden;
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: rotateY(-15deg) rotateX(10deg) translateY(0px); }
      50% { transform: rotateY(-15deg) rotateX(10deg) translateY(-20px); }
    }

    .mockup-header {
      padding: 0.75rem 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .mockup-body { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .chart-box { height: 120px; background: linear-gradient(90deg, var(--color-primary) 30%, transparent 100%); opacity: 0.3; border-radius: 10px; }
    .row { height: 12px; border-radius: 6px; background: var(--color-surface-2); width: 100%; }
    .row:nth-child(2) { width: 80%; }
    .row:nth-child(3) { width: 60%; }

    /* Features */
    .feature-card {
      padding: 2.5rem;
      text-align: left;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: white;
    }

    .bg-blue   { background: linear-gradient(135deg, #3b82f6, #0ea5e9); }
    .bg-purple { background: linear-gradient(135deg, #8b5cf6, #6366f1); }
    .bg-orange { background: linear-gradient(135deg, #f97316, #f59e0b); }

    /* Banner */
    .stats-banner {
      display: flex;
      justify-content: space-around;
      padding: 4rem;
      border-radius: var(--radius-lg);
      color: white;
    }

    .stat-item { text-align: center; }
    .stat-number { display: block; font-size: 3rem; font-weight: 800; letter-spacing: -0.02em; }
    .stat-label { font-size: 0.875rem; text-transform: uppercase; font-weight: 600; opacity: 0.8; }

    /* CTA */
    .cta-box { padding: 4rem; border-color: var(--color-primary); }

    @media (max-width: 1024px) {
      .hero-section { grid-template-columns: 1fr; text-align: center; }
      .hero-content h1 { font-size: 3rem; }
      .hero-content p { margin: 0 auto 2.5rem; }
      .hero-actions { justify-content: center; }
      .hero-visual { display: none; }
    }
  `]
})
export default class LandingPageComponent { }
