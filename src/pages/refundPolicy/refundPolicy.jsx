import "./refundPolicy.css";
import React from "react";
import { Card } from "react-bootstrap";

const RefundPolicy = () => {
  return (
    <div className="container my-5">
      <Card className="shadow-lg p-4">
        <h2 className="mb-3 text-center">Refund & Voucher Policy – Northern India Trip</h2>
        <p className="text-muted text-center">
          We value your trust and aim to keep our cancellation terms simple and fair.
        </p>

        {/* Refund Table */}
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Cancellation Timeframe</th>
                <th>Cash Refund</th>
                <th>Travel Voucher Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Within 24 hours of booking (trip starts in more than 7 days)</td>
                <td>100% refund</td>
                <td>Not applicable</td>
              </tr>
              <tr>
                <td>7–5 days before departure</td>
                <td>50% refund</td>
                <td>Voucher worth 60% (extra 10% value) – instant credit</td>
              </tr>
              <tr>
                <td>4–2 days before departure</td>
                <td>25% refund</td>
                <td>Voucher worth 35% (extra 10% value) – instant credit</td>
              </tr>
              <tr>
                <td>Less than 48 hours before departure</td>
                <td>No refund</td>
                <td>No voucher</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Voucher Terms */}
        <h4 className="mt-5">Voucher Terms</h4>
        <ul>
          <li>Valid for 12 months from the date of issue.</li>
          <li>Can be used for any trip, hotel, or package with Northern India Trip.</li>
          <li>Transferable to friends or family with written consent.</li>
          <li>Cannot be redeemed for cash.</li>
        </ul>

        {/* Special Cases */}
        <h4 className="mt-4">Special Cases</h4>
        <ul>
          <li>
            Non-refundable charges (permits, flights, hotels, etc.) will be
            deducted before refund/voucher value is calculated.
          </li>
          <li>
            In force majeure events (natural disasters, government restrictions), a
            full travel voucher valid for 18 months may be offered instead of a
            refund.
          </li>
          <li>
            Cash refunds take 7–10 business days, vouchers are issued instantly.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default RefundPolicy;

