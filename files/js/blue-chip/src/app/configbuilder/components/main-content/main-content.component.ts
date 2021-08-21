import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../models/design';
import { DesignService } from '../../services/design.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  design: Design;
  constructor(
    private route: ActivatedRoute,
    private service: DesignService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let slug = params['slug'];
      if (!slug) slug = '';
      this.design = null;

      this.service.designs.subscribe(designs => {
        if (designs.length == 0) return;

        this.design = this.service.designByName(slug);
      })
    })
  }

}
