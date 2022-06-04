import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { darkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Input() search:string="";
  @HostBinding('class') className = '';
  toggleControl = new FormControl(true);
  toggler: boolean =true;   
  constructor(public auth: AuthService, private router: Router, private overlay: OverlayContainer,private Service: darkmodeService) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl("/login");
  }
  gotoProfile() {
    this.router.navigate(
      ['/profile/'+ this.auth.getUser_id()]
    );
  } 
  sendState(): void {
    // send message to subscribers via observable subject
    this.Service.sendUpdate(false);
}
  

}

