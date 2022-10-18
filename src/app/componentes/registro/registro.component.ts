import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { UsuarioApiService } from 'src/app/servicios/usuario-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  /*BANDERAS*/
  parteForm:number = 0;

  miUsuario = new Usuario;
  public forma: FormGroup; 

  error:string;

  constructor(private router: Router, private fb: FormBuilder, private authFirebaseService: AuthFirebaseService, private usuarioService: UsuarioApiService ) { }

  ngOnInit(): void {
    this.forma = this.fb.group({ 
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'nickname': ['', Validators.required]
    })
  }

  registrarConGoogle(){
    // this.authFirebaseService.signUp().then(res =>{
    //   //this.router.navigate(['bienvenida']);
    //   this.parteForm = 1;
    //   localStorage.setItem('usuario',String(res.user.email));
    //     this.error = 'Error en registro con Google';
    // });
    this.parteForm = 1;
  }

  registrarConEmailyContrasena(){
    this.miUsuario.email = this.forma.value['email'];
    this.miUsuario.contrasena = this.forma.value['contrasena'];

    this.parteForm = 1;

    // this.authFirebaseService.signUpEmailPwd(this.miUsuario.email, this.miUsuario.contrasena).then(res =>{
    //   this.parteForm = 1;
    //   localStorage.setItem('usuario',String(res.user.email));
    //   this.error = 'Error en registro con Email y Contraseña';
    // })
  }

  guardaUsuario(){
    this.miUsuario.nombre = this.forma.value['nombre'];
    this.miUsuario.apellido = this.forma.value['apellido'];
    this.miUsuario.nickname = this.forma.value['nickname'];
    console.info("Usuario a guardar", this.miUsuario);

    this.usuarioService.guardarUsuario(this.forma.value).subscribe(res=>{
      console.log("respuesta", res);
    })
  }

}
