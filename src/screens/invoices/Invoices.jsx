import React from "react";
import loginImage from "../loginScreen/assets/images/loginImage.jpg";
import PrintIcon from "@mui/icons-material/Print";
import { useTranslation } from "react-i18next";

function printInvoice() {
  window.print();
}

function Invoices() {
  const { t } = useTranslation();

  return (
    <div className="invoice-wrapper" id="print-area">
      <div className="invoice">
        <div className="invoice-container">
          <div className="invoice-head">
            <div className="invoice-head-top">
              <div className="invoice-head-top-left text-start">
                <img src={loginImage} alt="Logo" className="circular-img" />
              </div>
              <div className="invoice-head-top-right text-end ">
                <h3>{t("Invoice")}</h3>
              </div>
            </div>
            <div className="hr"> </div>
            <div className="invoice-head-middle">
              <div className="invoice-head-middle-left text-start">
                <p>
                  <span className="text-bold">{t("Date")}:</span> 05/12/2025
                </p>
              </div>
              <div className="invoice-head-middle-right text-end">
                <p>
                  <span className="text-bold">{t("Invoice No")}:</span>
                </p>
              </div>
            </div>
            <div className="hr"></div>
            <div className="invoice-head-bottom">
              <div className="invoice-head-bottom-left">
                <ul>
                  <li className="text-bold">{t("Invoiced To")}:</li>
                  <li>ssssss</li>
                  <li>15</li>
                  <li>Hp</li>
                  <li>United</li>
                </ul>
              </div>
              <div className="invoice-head-bottom-right">
                <ul>
                  <li className="text-end">{t("Invoiced To")}:</li>
                  <li>ssssss</li>
                  <li>15</li>
                  <li>Hp</li>
                  <li>United</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="overflow-view">
            <div className="invoice-body">
              <table>
                <thead>
                  <tr>
                    <td className="text-bold">{t("Products")}</td>
                    <td className="text-bold">{t("Description")}</td>
                    <td className="text-bold">{t("Price")}</td>
                    <td className="text-bold">{t("Quantity")}</td>
                    <td className="text-bold">{t("Amount")}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cetamol</td>
                    <td></td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td className="text-end">$500.00</td>
                  </tr>
                  <tr>
                    <td>Imodium</td>
                    <td></td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td className="text-end">$500.00</td>
                  </tr>
                  <tr>
                    <td>Snip</td>
                    <td></td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td className="text-end">$500.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="invoice-body-bottom">
                <div className="invoice-body-info-item border-bottom">
                  <div className="info-item-td text-end text-bold">
                    {t("Sub Total")}:
                  </div>
                  <div className="info-item-td text-end">$22150.00</div>
                </div>
              </div>
              <div className="invoice-body-info-item border-bottom">
                <div className="info-item-td text-end text-bold">
                  {t("Tax")}:
                </div>
                <div className="info-item-td text-end">$22150.00</div>
              </div>
              <div className="invoice-body-info-item">
                <div className="info-item-td text-end text-bold">
                  {t("Total")}:
                </div>
                <div className="info-item-td text-end">$22150.00</div>
              </div>
            </div>
          </div>

          <div className="invoice-foot text-center">
            <p>
              <span className="text-bold text-center">{t("NOTE")}:</span>{" "}
              {t(
                "This is a computer-generated receipt and does not require a physical signature."
              )}
            </p>
            <div className="invoice-btns">
              <button
                type="button"
                className="invoice-btn"
                onClick={printInvoice}
              >
                <PrintIcon />
                <span>{t("Print")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
