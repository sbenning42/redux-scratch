import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AppStateDisplayComponent } from './app-state-display/app-state-display';
import { AuthStateDisplayComponent } from './auth-state-display/auth-state-display';
import { HubProductsStateDisplayComponent } from './hub-products-state-display/hub-products-state-display';
import { HubThemesStateDisplayComponent } from './hub-themes-state-display/hub-themes-state-display';
import { PreferencesStateDisplayComponent } from './preferences-state-display/preferences-state-display';
@NgModule({
	declarations: [AppStateDisplayComponent,
    AuthStateDisplayComponent,
    HubProductsStateDisplayComponent,
    HubThemesStateDisplayComponent,
    PreferencesStateDisplayComponent],
	imports: [CommonModule, IonicModule],
	exports: [AppStateDisplayComponent,
    AuthStateDisplayComponent,
    HubProductsStateDisplayComponent,
    HubThemesStateDisplayComponent,
    PreferencesStateDisplayComponent]
})
export class ComponentsModule {}
