
import { Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../shared/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'add-modal',
  template:
    `<div class="add-modal">
            <div class="add-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="add-modal-background"></div>`
})
export class AddComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() formGroup:string;
  @Output() addValues=new EventEmitter<string[]>();
  private element: any;
  addForm: any;

  constructor(private modalService: ModalService, private el: ElementRef, private formBuilder: FormBuilder, private http: HttpClient) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {


    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'add-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('add-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('add-modal-open');
  }
}