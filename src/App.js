import React from "react";
import { CustomThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/loginScreen/login";
import ManageTeam from "./screens/manageTeam/ManageTeam";
import Invoices from "./screens/invoices/Invoices";
import ProfileForm from "./screens/profileForm/ProfileForm";
import Calendar from "./screens/calendar/Calendar";
import BarChart from "./screens/barChart/BarChart";
import PieChart from "./screens/pieChart/PieChart";
import LineChart from "./screens/lineChart/LineChart";
import MainLayout from "./components/mainLayout";
import HomePage from "./screens/homePage/HomePage";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./screens/cart/Cart";
import MedicineCategory from "./components/category/categories for products/medicineCategory/MedicineCategory";
import FirstAidCategory from "./components/category/categories for products/firstAidCategory/FirstAidCategory.jsx";
import BabycareCategory from "./components/category/categories for products/babycareCategory/BabycareCategory.jsx";
import CosmeticsCategory from "./components/category/categories for products/cosmeticsCategory/CosmeticsCategory.jsx";
import PainRelief from "./components/category/categories for products/medicineCategory/MedicineCategoryScreens/painRelief/PainRelief.jsx";
import ColdFlu from "./components/category/categories for products/medicineCategory/MedicineCategoryScreens/coldFlu/ColdFlu.jsx";
import AllergyMedications from "./components/category/categories for products/medicineCategory/MedicineCategoryScreens/allergyMedications/AllergyMedications.jsx";
import VitaminsSupplements from "./components/category/categories for products/medicineCategory/MedicineCategoryScreens/vitaminsSupplements/VitaminsSupplements.jsx";
import MentalHealth from "./components/category/categories for products/medicineCategory/MedicineCategoryScreens/mentalHealth/MentalHealth.jsx";
import AddCategory from "./components/category/categories for products/addCategory/AddCategoryComponent.jsx";
import AddCategoryScreen from "./components/category/categories for products/addCategory/AddCategoryScreen.jsx";
import ManageSuppliers from "./screens/manageSuppliers/ManageSuppliers.jsx";
import Purshase from "./screens/purshase/Purshase.jsx";
import CategoryDetails from "./components/category/categories for products/categoryDetails/CategoryDetails.jsx";
import CategoryMedicine from "./components/category/categories for products/categoryDetails/Medicine.jsx";
import Category from "./components/category/Category.jsx";
import MedicineDetails from "./components/category/categories for products/medicineCategory/AddMedicine.jsx";
import AddProductDetails from "./components/category/categories for products/medicineCategory/AddMedicine.jsx";
import Medicine from "./components/category/categories for products/categoryDetails/Medicine.jsx";
import AddMedicine from "./components/category/categories for products/medicineCategory/AddMedicine.jsx";
import AddProduct from "./components/category/categories for products/AddProduct.jsx";
function App() {
  document.title = "Pharmacy App";
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
          <Route path="AddMedicine" element={<AddMedicine/>} />
          <Route path="AddProduct" element={<AddProduct/>} />
{/* 
          <Route path="/medicineb" element={<CategoryDetails/>} /> */}

            <Route path="categoryDetails" element={<CategoryDetails/>} />
            <Route path="home" element={<HomePage />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="manageSuppliers" element={<ManageSuppliers />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="form" element={<ProfileForm />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="purshase" element={<Purshase />} />
            <Route path="bar" element={<BarChart />} />
            <Route path="pie" element={<PieChart />} />
            <Route path="line" element={<LineChart />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/medicine" element={<CategoryDetails />} />
            <Route path="/babycare" element={<BabycareCategory />} />
            <Route path="/first-aid" element={<FirstAidCategory />} />
            <Route path="/cosmetics" element={<CosmeticsCategory />} />
            <Route path="medicine/pain-relief" element={<PainRelief />} />
            <Route path="medicine/cold-flu" element={<ColdFlu />} />
            <Route
              path="medicine/allergy-medications"
              element={<AllergyMedications />}
            />
            <Route
              path="medicine/vitamins-supplements"
              element={<VitaminsSupplements />}
            />
            <Route path="medicine/mental-health" element={<MentalHealth />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route
              path="/add-category-screen"
              element={<AddCategoryScreen />}
            />
          </Route>
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
