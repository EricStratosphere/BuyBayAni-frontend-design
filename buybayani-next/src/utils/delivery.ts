/**
 * Same-Day Delivery Utility Functions
 * 
 * Business Rules:
 * - Same-day delivery only available on weekends (Saturday & Sunday)
 * - Standard harvest is on Friday, goods stay fresh 2-3 days
 * - Additional fee of ₱150 for same-day delivery
 * - Orders must be placed before 2 PM for same-day delivery
 * - Delivery window: 4 PM - 8 PM same day
 */

export interface DeliveryOption {
  type: 'standard' | 'same-day';
  fee: number;
  deliveryDate: Date;
  deliveryWindow?: string;
  available: boolean;
  description: string;
}

/**
 * Check if same-day delivery is available based on current date and time
 */
export function isSameDayDeliveryAvailable(): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const currentHour = now.getHours();
  
  // Only available on weekends (Saturday = 6, Sunday = 0)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Must order before 2 PM (14:00) for same-day delivery
  const beforeCutoff = currentHour < 14;
  
  return isWeekend && beforeCutoff;
}

/**
 * Get all available delivery options for today
 */
export function getDeliveryOptions(): DeliveryOption[] {
  const now = new Date();
  const sameDayAvailable = isSameDayDeliveryAvailable();
  
  const options: DeliveryOption[] = [
    {
      type: 'standard',
      fee: 0,
      deliveryDate: getNextStandardDeliveryDate(),
      available: true,
      description: 'Standard delivery (2-3 business days)'
    }
  ];
  
  if (sameDayAvailable) {
    const sameDayDate = new Date(now);
    options.push({
      type: 'same-day',
      fee: 150,
      deliveryDate: sameDayDate,
      deliveryWindow: '4 PM - 8 PM',
      available: true,
      description: 'Same-day delivery (4 PM - 8 PM today)'
    });
  }
  
  return options;
}

/**
 * Calculate the next standard delivery date (2-3 business days)
 */
export function getNextStandardDeliveryDate(): Date {
  const today = new Date();
  const deliveryDate = new Date(today);
  
  // Add 2-3 business days
  let daysToAdd = 2;
  const currentDay = deliveryDate.getDay();
  
  // If today is Friday, Saturday, or Sunday, delivery is on Monday/Tuesday
  if (currentDay >= 5) {
    daysToAdd = currentDay === 5 ? 3 : currentDay === 6 ? 2 : 2; // Fri->Mon(3), Sat->Mon(2), Sun->Tue(2)
  }
  
  deliveryDate.setDate(today.getDate() + daysToAdd);
  return deliveryDate;
}

/**
 * Calculate same-day delivery fee based on cart total
 */
export function calculateSameDayFee(cartTotal: number): number {
  const baseFee = 150;
  
  // Free same-day delivery for orders over ₱1000
  if (cartTotal >= 1000) {
    return 0;
  }
  
  return baseFee;
}

/**
 * Format delivery date for display
 */
export function formatDeliveryDate(date: Date, includeTime?: boolean): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = 'numeric';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-PH', options);
}

/**
 * Check if a product is eligible for same-day delivery
 * (All fresh produce is eligible if same-day delivery is available)
 */
export function isProductEligibleForSameDay(productType: string = 'produce'): boolean {
  // Fresh produce is eligible, processed foods might not be
  const eligibleTypes = ['produce', 'vegetables', 'fruits'];
  return eligibleTypes.includes(productType.toLowerCase()) && isSameDayDeliveryAvailable();
}

/**
 * Get delivery status message for orders
 */
export function getDeliveryStatusMessage(deliveryType: 'standard' | 'same-day', orderDate: Date, deliveryDate: Date): string {
  const today = new Date();
  const isToday = deliveryDate.toDateString() === today.toDateString();
  
  if (deliveryType === 'same-day') {
    if (isToday) {
      return 'Your order will be delivered today between 4 PM - 8 PM';
    } else {
      return `Same-day delivery completed on ${formatDeliveryDate(deliveryDate)}`;
    }
  }
  
  return `Standard delivery on ${formatDeliveryDate(deliveryDate)}`;
}

/**
 * Calculate estimated delivery time for same-day orders
 */
export function getSameDayDeliveryETA(): string {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour < 14) {
    return '4 PM - 8 PM today';
  } else if (currentHour < 16) {
    return '6 PM - 8 PM today';
  } else {
    return 'Delivery window may be extended';
  }
}