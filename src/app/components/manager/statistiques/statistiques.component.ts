import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent {

  constructor(private scriptLoaderService: ScriptLoaderService) {

  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

}
