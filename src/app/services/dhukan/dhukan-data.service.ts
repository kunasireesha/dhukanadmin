import { AppSettings } from './../constants/constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
    constructor(private http: Http) { }
    login(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.loginUrl, params, { headers: headers });
    }
    getCat() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getCatUrl, { headers: headers });
    }
    addCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.addCatUrl, params, { headers: headers });
    }
    updateCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.updateCat, params, { headers: headers });
    }
    deleteCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteCat, params, { headers: headers });
    }
    getProduct() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getProductUrl, { headers: headers });
    }
    deleteProduct(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteProdUrl, params, { headers: headers });
    }
    updateProduct(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.updateProdUrl, params, { headers: headers });
    }
    insertProduct(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.insertProduct, params, { headers: headers })
    }
    insertSubCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.insertSubCat, params, { headers: headers })
    }
    getSubCategery() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getSubCategory, { headers: headers });
    }
    deleteSubCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteSubCat, params, { headers: headers })
    }
    updateSubCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.updateSubCat, params, { headers: headers })
    }
    uploadProductImg(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.uploadProductimg, params, { headers: headers })
    }
    public uploadFile(fileToUpload: File) {
        const _formData = new FormData();
        _formData.append('excelFile', fileToUpload, fileToUpload.name);
        return this.http.post(AppSettings.importExcel, _formData);
    }
    editproductImg(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.multiproductimgUrl, params, { headers: headers })
    }
    getSubCat(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getSubCatUrl, params, { headers: headers })
    }
}