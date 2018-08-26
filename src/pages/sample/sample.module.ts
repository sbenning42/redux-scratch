import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SamplePage } from './sample';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SamplePage,
  ],
  imports: [
    IonicPageModule.forChild(SamplePage),
    ComponentsModule
  ],
})
export class SamplePageModule {}
