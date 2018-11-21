const base_url = 'http://192.169.243.70:5000/';
export const AppSettings = {
    loginUrl: base_url + 'users/admin/login',
    getCatUrl: base_url + 'cart/admin/catagiry',
    addCatUrl: base_url + 'cart/admin/insert',
    updateCat: base_url + 'cart/admin/update',
    deleteCat: base_url + 'cart/admin/delete',
    getProductUrl: base_url + 'products/getproduct',
    deleteProdUrl: base_url + 'products/deleteproduct',
    updateProdUrl: base_url + 'products/updateproduct',
    insertProduct: base_url + 'products/insertproduct',
    insertSubCat: base_url + 'subcategorty/insertcategory',
    getSubCategory: base_url + 'subcategorty/getdata',
    deleteSubCat: base_url + 'subcategorty/delete',
    updateSubCat: base_url + 'subcategorty/update',
    uploadProductimg: base_url + 'products/uploadimage',
    importExcel: base_url + 'products/readExcel',
    multiproductimgUrl: base_url + 'products/getproductbyid',
    getSubCatUrl: base_url + 'products/getsubdata'

}
