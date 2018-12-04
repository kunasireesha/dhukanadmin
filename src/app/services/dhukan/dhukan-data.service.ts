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
    deleteProdImg(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteProImgUrl, params, { headers: headers })
    }
    getVendors() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getVendorUrl, { headers: headers })
    }
    getVendorsbyId(id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getVendorById + id, { headers: headers })
    }
    updateVendorbyId(id, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateVendorById + id, params, { headers: headers })
    }
    deleteVendorbyId(id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.deleteVendorById + id, { headers: headers })
    }
    //offers
    getOffers() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getOffersUrl, { headers: headers })
    }
    postOffersUrl(data) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.postOffersUrl, data, { headers: headers })
    }
    getOfferbyId(id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getOfferbyId + id, { headers: headers })
    }
    updateOfferById(id, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateOfferById + id, params, { headers: headers })
    }
    deleteOfferById(id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.deleteOfferById + id, { headers: headers })
    }
    //delivery
    addDeliveryUrl(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.addDeliveryUrl, params, { headers: headers });
    }
    getOrders() {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'token': localStorage.token,
        });
        return this.http.get(AppSettings.getOrdersUrl, { headers: headers });
    }
    getDelivery() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getDeliveryUrl, { headers: headers });
    }
    deleteDelivery(id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteDeliveryById, id, { headers: headers });
    }
    // addLocation(params) {
    //     const headers = new Headers({ 'Content-Type': "application/JSON" });
    //     return this.http.post(AppSettings.getCountriesUrl, params, { headers: headers });
    // }
    getCountries() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getCountriesUrl, { headers: headers })
    }
    getStatedUrl(id) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getStatesUrl + '/' + id, { headers: headers })
    }
    getCityUrl(id) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getCityUrl + '/' + id, { headers: headers })
    }
    getAreaUrl(id) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getAreaUrl + '/' + id, { headers: headers })
    }
    addLocation(params) {
        const headers = new Headers({ 'Content-Type': "application/json" });
        return this.http.post(AppSettings.addLocation, params, { headers: headers })
    }
    getLocation() {
        const headers = new Headers({ 'Content-Type': "application/json" });
        return this.http.get(AppSettings.getLocation, { headers: headers })
    }
    deleteLocation(id) {
        const headers = new Headers({ 'Content-Type': "application/json" });
        return this.http.delete(AppSettings.deleteLocation + "/" + id, { headers: headers })
    }
    // termsConditions(params) {
    //     const headers = new Headers({ 'Content-Type': "application/JSON" });
    //     return this.http.post(AppSettings.getStatesbyId, params, { headers: headers })
    // }
    postBannerUrl(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.postbannersUrl, params, { headers: headers })
    }
    getBannerUrl() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getBannerUrl, { headers: headers })
    }
    deleteBanner(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.deleteBannerUrl, params, { headers: headers })
    }
    editBannerbyId(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.editBannerUrl, params, { headers: headers })
    }
    updateBannerbyId(params, id) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updatebannerUrl + '/' + id, params, { headers: headers })
    }
    // postDealBannerUrl(params) {
    //     const headers = new Headers({ 'Content-Type': "application/JSON" });
    //     return this.http.post(AppSettings.postDealbannersUrl, params, { headers: headers })
    // }
    // getDealBannerUrl() {
    //     const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    //     return this.http.get(AppSettings.getDealBannerUrl, { headers: headers })
    // }
    // deleteDealBanner(id) {
    //     const headers = new Headers({ 'Content-Type': "application/JSON" });
    //     return this.http.delete(AppSettings.deleteDealBannerUrl + '/' + id, { headers: headers })
    // }
    // updateDealBanner(id) {
    //     const headers = new Headers({ 'Content-Type': "application/JSON" });
    //     return this.http.put(AppSettings.updateDealbannerUrl + '/' + id, { headers: headers })
    // }
}