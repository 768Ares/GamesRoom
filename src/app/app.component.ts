import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  navFlag = true;
  navHide = true;
  menu: any;
  menuDisplay = 'none';
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const self = this;
    this.menu = document.querySelector('html');
    this.menu.onclick = function closeNav() {
      // self.menuDisplay = 'block';
      const x = document.getElementById('nav-dropdown');
      if (x.style.display === 'block' && !self.navHide) {
        x.style.display = 'none';
    } else if (x.style.display === 'block') {
      self.navHide = false;
    }
    if (x.style.display === 'none') {
      self.navHide = true;
    }
    };

    const link = document.querySelector('a');
    link.addEventListener('click', () => {
      const navList = document.getElementById('nav-list');
        navList.style.display = 'none';
    });



  }

  clickNav($event) {
  const navDropdown = document.getElementById('nav-dropdown');
    if (navDropdown.style.display === 'none') {
      navDropdown.style.display = 'block';
        this.navFlag = false;
    } else {
      navDropdown.style.display = 'none';
        this.navFlag = true;
        const navList = document.getElementById('nav-list');
        navList.style.display = 'none';
    }

  // $event.stopPropagation();
  }

  mobilNav() {
    const navList = document.getElementById('nav-list');
    if (navList.style.display === 'block') {
    navList.style.display = 'none';
    } else {
      navList.style.display = 'block';
    }
    const navToggle = document.getElementById('nav-toggle');
    navToggle.classList.toggle('active');
  }

  clouseMobileNav() {
    const navList = document.getElementById('nav-list');
    if (navList.style.display === 'block') {
      navList.style.display = 'none';
      const navToggle = document.getElementById('nav-toggle');
      navToggle.classList.toggle('active');
      }
  }



  getMyStyle() {
    const myStyle = {
      'display': this.menuDisplay
    };
    return myStyle;
  }

}
