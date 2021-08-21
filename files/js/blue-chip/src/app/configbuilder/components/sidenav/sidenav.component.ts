import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Design } from '../../models/design';
import { DesignService } from '../../services/design.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;

  designs: Observable<Design[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private designService: DesignService,
    private router: Router) { }

    @ViewChild(MatSidenav) sidenav: MatSidenav

  ngOnInit(): void {
    // this.breakpointObserver.observe([ Breakpoints.XSmall ])
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      })

      this.designs = this.designService.designs;
      this.designService.loadAll();

      // log data out to browser console
      this.designs.subscribe(data => {
        console.log(data);
      })

      this.router.events.subscribe(() => {
        if (this.isScreenSmall) {
          this.sidenav.close();
        }
      })
  }

}
