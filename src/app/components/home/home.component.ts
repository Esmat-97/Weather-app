import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,DatePipe,NavbarComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  data: any=[] ;
  location:any = ''
  search:string = ''

  constructor(private _api: ApiService) { 
  }
  ngOnInit(){
    this._api.getData().subscribe((res:any)=>{
      this.data=res
console.log(this.data)
    })
}
}




