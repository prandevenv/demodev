import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NFC, Ndef } from '@ionic-native/nfc';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scannedValue:any;
  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, private nfc: NFC, private ndef: Ndef) {

  }
scan(){
  this.scannedValue=null;
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.scannedValue= barcodeData;
   }).catch(err => {
       console.log('Error', err);
   });
}
nfcScan(){
  this.scannedValue =null;
  this.nfc.addNdefListener(() => {
    console.log('successfully attached ndef listener');
  }, (err) => {
    console.log('error attaching ndef listener', err);
  }).subscribe((event) => {
    console.log('received ndef message. the tag contains: ', event.tag);
    console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    this.scannedValue = event.tag;
  
    // let message = this.ndef.textRecord('Hello world');
    // this.nfc.share([message]).then(onSuccess).catch(onFailure);
  });
  
}
}
