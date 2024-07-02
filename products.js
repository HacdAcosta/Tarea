"use strict";
import DialogCreateProduct from "../Utils/dialogCreateProduct.js";
import dialogEditPrices from "../Utils/dialogEditPrices.js";
import dialogMassiveUpdate from "../Utils/dialogMassiveUpdatePrices.js";

export default Vue.component("products-app", {
    data: function () {
        return {
            description: "",
            code_bar: "",
            code: "",
            brand_id: "",
            presentation_id: "",
            packing_unit: 1,
            selected: null,
            tax_id: null,

            dialog: null,
            products: [],
            subcategory_id: null,
            category_id: null,

            headers: {
                code: "Codigo",
                description: "Nombre",
                code_bar: "Codigo de Barra",
                packing_unit: "Empaque"
            },

            categories: [],
            headersCategory: {
                category_name: "Categoría",
                subcategory_name: "SubCategoría",
                fiscal_category: "Tipo"
            },

            buttonsGrid: [
                {
                  text: "Categorias",
                  icon: "plus",
                  color: "pink",
                  action: this.openDialog,
                  id: "add-category"
                },
                {
                  text: "Super Edición",
                  icon: "pencil",
                  color: "yellow",
                  action: (id) => this.openDialog(id, "edit"), // Llamada a openDialog con "edit" como diálogo
                  id: "super-edicion"
                }
              ],              
            
            buttonsGridCategories: [
                {
                    id: "fiscal-category",
                    text: "Configurar Fiscal",
                    icon: "bookmark",
                    color: "primary",
                    action: this.changeFiscalCategory
                }
            ],
            buttonsToolbar: [
                {
                    text: "Categorias",
                    icon: "bookmark-plus",
                    color: "teal",
                    action: (id) => this.openSuperEditDialog(id),
                    id: "add-category",
                }
            ],
            superEditionEnabled: false
        };
    },

    created: function () {
        this.successIndex = this.successIndex.bind(this);
        this.getIndex();
    },

    methods: {
        setCategory: function(id){
            this.category_id = id;
        },

        setSubCategory: function(id){
            this.subcategory_id = id;
        },

        selectTax: function(id){
            this.tax_id = id;
        },

        addCategory: function(){

            fetchControllers("Products", "addSubCategory", {
                params: {
                    product_id: this.selected,
                    category_id: this.category_id,
                    subcategory_id: this.subcategory_id
                },
                success: (response) => {
                    alertApp({
                        text: response.message,
                        color: "success",
                        icon: "check"
                    });

                    this.getIndex();
                    this.dialog = null;
                },
                failed: (response) => {
                    alertApp({
                        text: response.message,
                        color: "error",
                        icon: "alert"
                    });
                    console.error(response.message);
                }
            });
        },

        getIndex: function (params = {}, page = 0) {
            fetchControllers("Products", "index", {
                success: this.successIndex,
                failed: (response) => {
                    console.error(response.message);
                },
                params: {page: page, filters: params.filters}
            });
        },
        
        

        openDialog: function(id, dialog) {
            this.description = "";
            this.code_bar = "";
            this.selected = id;
            this.code = "";
            this.tax_id = null;
            this.brand_id = 1;
            this.presentation_id = 19;
            this.categories = [];
            this.packing_unit = 1;
          
            if (id != null) {
              fetchControllers("Products", "show", {
                params: { id: id },
                success: (response) => {
                  let data = response.data;
                  this.description = data.description;
                  this.code_bar = data.code_bar;
                  this.code = data.code;
                  this.tax_id = data.tax_id;
                  this.brand_id = data.brand_id;
                  this.presentation_id = data.presentation_id;
                  this.packing_unit = data.packing_unit;
                  this.dialog = dialog;
                  this.getListCategories();
                },
                failed: (response) => {
                  console.error(response.message);
                }
              });
            } else {
              fetchControllers("Products", "lastNumber", {
                params: {},
                success: response => {
                  this.code = response.data.code;
                  this.dialog = dialog;
                },
                failed: error => {
                  console.error(error.message);
                }
              });
            }
          
            // Verifica si el diálogo es "edit" y muestra los detalles del producto
            if (dialog === "edit") {
              this.dialog = "show";
            } else {
              this.dialog = dialog;
            }
          },       
          
        openSuperEditDialog: function(id) {
            // Aquí debes agregar la lógica necesaria para mostrar el diálogo de super edición
            // Puedes copiar y modificar el código de la función `openDialog` para lograr esto
            this.description = "";
            this.code_bar = "";
            this.selected = id;
            this.code = "";
            this.tax_id = null;
            this.brand_id = 1;
            this.presentation_id = 19;
            this.categories = [];
            this.packing_unit = 1;
        
            // Agrega aquí la lógica adicional para la super edición, como campos extras, permisos, etc.
        
            // Abre el diálogo de super edición
            this.dialog = "super-edit";
        },
        
        updateSuperProduct: function() {
    // Aquí debes agregar la lógica necesaria para actualizar el producto con los nuevos campos de la super edición
    fetchControllers("Products", "updateSuperProduct", {
        params: {
            id: this.selected,
            attributes: {
                description: this.description,
                brand_id: this.brand_id,
                presentation_id: this.presentation_id,
                code_bar: this.code_bar,
                code: this.code,
                packing_unit: this.packing_unit,
                tax_id: this.tax_id,
                field1: this.field1,
                field2: this.field2
                // Agrega aquí los demás campos de la super edición
            },
            categories: this.categories
        },
        success: (response) => {
            this.getIndex();
            this.$gridbox[0].forceReload();
            this.dialog = null;
        },
        failed: (response) => {
            console.log(response.message);
        },
    });
},
        
        successIndex: function (response) {
            this.products = response.data;
        },

        createProduct: function () {
            fetchControllers("Products", "create", {
                params: {
                    description: this.description,
                    brand_id: this.brand_id,
                    presentation_id: this.presentation_id,
                    code_bar: this.code_bar,
                    code: this.code,
                    packing_unit: this.packing_unit,
                    tax_id: this.tax_id,
                    categories: this.categories,
                },
                success: (response) => {
                    this.getIndex();
                    this.$gridbox[0].forceReload();
                    this.dialog = null;
                },
                failed: (response) => {
                    console.log(response.message);
                },
            });
        },

        updateProduct: function () {
            fetchControllers("Products", "update", {
                params: {
                    id: this.selected,
                    attributes: {
                        description: this.description,
                        brand_id: this.brand_id,
                        presentation_id: this.presentation_id,
                        code_bar: this.code_bar,
                        code: this.code,
                        packing_unit: this.packing_unit,
                        tax_id: this.tax_id
                    },
                    categories: this.categories
                },
                success: (response) => {
                    this.getIndex();
                    this.$gridbox[0].forceReload();
                    this.dialog = null;
                },
                failed: (response) => {
                    console.log(response.message);
                },
            });
        },

        selectedBrand: function (id) {
            this.brand_id = id;
        },
        
        selectedPresentation: function (id) {
            this.presentation_id = id;
        },

        cancelDialog: function () {
            this.dialog = null;
        },

        // eliminando producto
        destroyProduct: function () {
            fetchControllers("Products", "delete", {
                params: { id: this.selected },
                success: (response) => {
                    this.getIndex();
                    this.dialog = null;
                },
                failed: (response) => {
                    console.error(response.message);
                    alertApp({
                        color: "error",
                        text: response.message,
                        icon: "alert"
                    });
                },
            });
        },

        // obtiene el listado de 
        getListCategories: function(){
            fetchControllers("Products", "listSubCategory",{
                params: {product_id: this.selected },
                success: (response)=>{
                    let data = response.data;
                    this.categories = data;
                },
                failed: (response)=>{
                    alertApp({
                        text: response.message,
                        icon: "alert",
                        color: "red"
                    });
                }
            });
        },

        // funcion que permite eliminar la categoria
        // agregada en el producto
        deleteCategory: function(id){
            fetchControllers("Products", "deleteSubCategory", {
                params: {id},
                success: (response)=>{
                    alertApp({
                        text: response.message,
                        icon: "check",
                        color: "success"
                    });
                    this.getListCategories();
                },
                failed: (response)=>{
                    alertApp({
                        text: response.message,
                        icon: "alert",
                        color: "red"
                    });
                }
            });
        },

        preEventAddCategory: function(){
            fetchControllers("SubCategories", "show", {
                params: {id: this.subcategory_id},
                success: (response) => {
                    let categories  = this.categories;
                    categories.push({
                        id: null,
                        subcategory_id: this.subcategory_id,
                        category_id: this.category_id,
                        subcategory_name: response.data.name,
                        category_name: response.data.category,
                        fiscal_category: "NO GUARDADO",
                    });

                    console.log( categories );

                    this.categories = categories;
                },
                failed: (response) =>{
                    alertApp({
                        text: response.message,
                        icon: "alert",
                        color: "error"
                    });
                }
            });
        },

        preEventRemoveCategory: function(id, dialog, key){
            let categories = this.categories;
            categories = categories.filter((c, i) => i != key);
            this.categories = categories;
        },

        changeFiscalCategory: async function (product_subcategories_id){
            if (!product_subcategories_id) return alertApp({ text: "Para asignar la categoría fiscal, la categoría debe estar guardada", color: "error"})
            await fetchControllers("Products", "setFiscalCategory", {
                params: {
                    product_subcategories_id,
                },
                success: (response) => {
                    console.log(response)
                    return alertApp({ text: response.message, color: "success"})
                },
                failed: (response) => {
                    return alertApp({ text: response.message, color: "error"})                    
                }
            });
            this.getListCategories();
        },

        successDialogProduct: function () {
            this.dialog = null;
            this.$gridbox[0].forceReload();
        },
    },

    watch: {
        dialog: function (value) {
            if( value == "show" || value == "add-category" )
                this.getListCategories();
        },
    },

    template: `
    <div>
        <v-container>    

            <dialog-basic :active = "dialog == 'add-category'">
                <template slot = "dialog-title">
                    <span>Agregar Categoria</span>
                </template>
                
                <template slot = "dialog-content">
                    <v-form>
                        <v-row>

                            <v-col cols = "12">
                                <autocomplete-form
                                    v-if = "dialog == 'add-category'"
                                    controller = "Categories"
                                    action = "index"
                                    :getSelect = "setCategory"
                                    label = "Categoría"
                                    column = "name"
                                    itemValue = "id"
                                >
                                </autocomplete-form>
                            </v-col>

                            <v-col cols = "12">
                                <autocomplete-form
                                    v-if = "dialog == 'add-category'"
                                    controller = "SubCategories"
                                    action = "index"
                                    :getSelect = "setSubCategory"
                                    label = "SubCategoría"
                                    column = "name"
                                    :params = "{category_id: category_id}"
                                    itemValue = "id"
                                >
                                </autocomplete-form>
                            </v-col>
                            
                            <v-col cols = "12">
                            
                                <gridbox-app 
                                    :headers = "headersCategory"  
                                    :resources = "categories"
                                    :reload = "getListCategories"
                                    :delete = "deleteCategory"
                                    :buttonsGrid = "buttonsGridCategories"
                                />
                            </v-col>

                        </v-row>
                    </v-form>
                </template>

                <template slot = "dialog-actions">
                    <v-btn color = "cyan dark-2" v-on:click = "addCategory" outlined>
                        <span>Agregar</span>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn outlined color = "red" v-on:click = "dialog = null">
                        <span>Cancelar</span>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </dialog-basic>
            
            <dialog-basic :active="dialog == 'super-edit'">
    <template slot="dialog-title">
        <span>Super Edición del Producto</span>
    </template>

    <template slot="dialog-content">
        <!-- Agrega aquí los campos y controles adicionales para la super edición -->
        <v-row>
            <v-col cols="6">
                <v-text-field label="Campo adicional 1" v-model="field1"></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Campo adicional 2" v-model="field2"></v-text-field>
            </v-col>
            <!-- Agrega más campos según sea necesario -->
        </v-row>
    </template>

    <template slot="dialog-actions">
        <v-btn color="cyan dark-2" v-on:click="updateSuperProduct" outlined>
            <span>Guardar</span>
            <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn outlined color="red" v-on:click="dialog = null">
            <span>Cancelar</span>
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </template>
</dialog-basic>

            <dialog-confirm :active = "dialog == 'delete'" :confirm = "destroyProduct" :cancel = "cancelDialog">
                <template slot = "dialog-title">
                    <span>Eliminar producto</span>
                </template>

                <template slot = "dialog-content">
                    <span>¿Usted esta seguro de eliminar el siguiente producto?</span>
                </template>
            </dialog-confirm>

            <dialog-basic :active = "dialog == 'show'" >
                <template slot = "dialog-title">
                    <span>Detalles del Producto</span>
                </template>

                <template slot = "dialog-content">

                    <v-row>
                        <v-col cols = "6">
                            <b>Codigo de Barra: </b>
                            <span>{{ code_bar }}</span>
                        </v-col>
                        <v-col cols = "6">
                            <b>Codigo: </b>
                            <span>{{ code }}</span>
                        </v-col>
                        <v-col cols = "6">
                            <b>Producto: </b>
                            <span>{{ description }}</span>
                        </v-col>
                        <v-col cols = "6">
                            <b>Unidad de Empaque: </b>
                            <span>{{ packing_unit }}</span>
                        </v-col>

                        <v-col cols = "12">
                            <gridbox-app 
                                :headers = "headersCategory"
                                :reload = "getListCategories"
                                :resources = "categories"
                                :delete  = "deleteCategory"
                                :toolbarButtons = "buttonsToolbar"
                            />
                        </v-col>
                    </v-row>

                </template>
           
                <template slot = "dialog-actions">
                    <v-btn v-on:click = "dialog = null" color = "gray" outlined>
                        <v-icon>mdi-close</v-icon>
                        <span>Cerrar</span>
                    </v-btn>
                </template>

            </dialog-basic>

            <dialog-create-product
                :show="dialog == 'new' || dialog == 'edit'"
                :hide="() => dialog = null"
                :confirm="successDialogProduct"
                :productId="selected"
            />

            <gridbox-app 
                url = "Products.index"
                :headers = "headers"
                :new = "openDialog"
                :edit = "openDialog"
                :show = "openDialog"
                :delete = "openDialog"
                :buttonsGrid = "buttonsGrid"
            >
            </gridbox-app>    
        </v-container>
    </div>
    `,
});

