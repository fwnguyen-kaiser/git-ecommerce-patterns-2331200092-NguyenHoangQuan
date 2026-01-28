import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }
    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        const isAvalable = this.inventoryService.checkStock(orderDetails.productIds);
        if (!isAvalable) {
            console.error("Out of stock");
            return;
        }
        console.log("Step 1: Done")
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        const paymentSuccessful = this.paymentService.processPayment(orderDetails.userId, 100);
        if (!paymentSuccessful) {
            console.log("Order failed");
            return;
        }
        console.log("Step 2: Done");
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        this.shippingService.arrangeShipping(orderDetails.productIds, orderDetails.shippingInfo);
        console.log("Step 3: Done");
        // 4. Log the result of each step. If a step fails, log it and stop.
        console.log("All done");
    }
}

export { CheckoutFacade };
