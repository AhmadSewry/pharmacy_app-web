import React from "react";
import loginImage from "../loginScreen/assets/images/loginImage.jpg";
import PrintIcon from "@mui/icons-material/Print";

function printInvoice() {
  window.print();
}
function Invoices() {
  return (
    <div className="invoice-wrapper" id="print-area">
      <div className="invoice">
        <div className="invoice-container">
          <div className="invoice-head">
            <div className="invoice-head-top">
              <div className="invoice-head-top-left text-start">
                <img src={loginImage} alt="Logo" className="circular-img" />
              </div>
              <div class="invoice-head-top-right text-end ">
                <h3>Invoice</h3>
              </div>
            </div>
            <div class="hr"> </div>
            <div classs=" invoice-head-middle">
              <div class="invoice=head-middle-left text-start">
                <p>
                  <span class="text-blod"> Date</span> :05/12/2025
                </p>
              </div>
              <div class="invoice-head-middle-right text-end">
                <p>
                  {" "}
                  <span class="text-bold">Invoice No :</span>
                </p>
              </div>
            </div>
            <div class="hr"></div>
            <div class="invoice-head-bottom">
              <div class="invoice-head-bottom-left">
                <ul>
                  <li class="text-bold">Invoiced To :</li>
                  <li>ssssss</li>
                  <li>15</li>
                  <li>Hp</li>
                  <li>United</li>
                </ul>
              </div>
              <div class="invoice-head-bottom-right">
                <ul>
                  <li class="text-end">Invoiced To :</li>
                  <li>ssssss</li>
                  <li>15</li>
                  <li>Hp</li>
                  <li>United</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overflow-view">
            <div class="invoice-body">
              <table>
                <thead>
                  <tr>
                    <td class="text-bold">Products</td>
                    <td class="text-bold>">Description</td>
                    <td className="text-bold"> Price</td>
                    <td className="text-bold"> Quantity</td>
                    <td className="text-bold"> Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cetamol</td>
                    <td> </td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td calss="text-end">$500.00</td>
                  </tr>

                  <tr>
                    <td>Imodium</td>
                    <td> </td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td calss="text-end">$500.00</td>
                  </tr>

                  <tr>
                    <td>Snip</td>
                    <td> </td>
                    <td>$50.00</td>
                    <td>10</td>
                    <td calss="text-end">$500.00</td>
                  </tr>
                </tbody>
              </table>
              <div className="invoice-body-bottom">
                <div className="invoice-body-info-item border-bottom">
                  <div className="info-item-td text-end text-end text-bold">
                    {" "}
                    Sub Total :
                  </div>
                  <div className="info-item-td text-end">$22150.00</div>
                </div>
              </div>
              <div className="invoice-body-info-item border-bottom">
                <div className="info-item-td text-end text-end text-bold">
                  {" "}
                  Tax :
                </div>
                <div className="info-item-td text-end">$22150.00</div>
              </div>

              <div className="invoice-body-info-item">
                <div className="info-item-td text-end text-end text-bold">
                  {" "}
                  Total :
                </div>
                <div className="info-item-td text-end">$22150.00</div>
              </div>
            </div>
          </div>
          <div className="invoice-foot text-center">
            <p>
              {" "}
              <span class="text-bold text-center">NOTE:</span>
              this is computer generatedd receipt and dose not require physical
              signaature
            </p>
            <div className="invoice-btns">
              <button
                type="button"
                className="invoice-btn"
                onClick={printInvoice}
              >
                <PrintIcon></PrintIcon>
                <span>print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
