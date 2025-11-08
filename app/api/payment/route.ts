import { NextRequest, NextResponse } from 'next/server'

export interface PaymentRequest {
  orderId: string
  amount: number
  currency: string
  customerInfo: {
    name: string
    email: string
    phone?: string
    address: {
      street: string
      city: string
      country: string
      postalCode: string
    }
  }
  items: Array<{
    id: number
    title: string
    price: number
    quantity: number
  }>
}

export interface PaymentResponse {
  success: boolean
  paymentUrl?: string
  orderId?: string
  error?: string
  message?: string
}

// POST /api/payment - Ödeme işlemi başlat
export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()

    // TODO: Iyzico entegrasyonu burada yapılacak
    // const iyzipay = require('iyzipay');
    // 
    // const iyzipayConfig = {
    //   apikey: process.env.IYZICO_API_KEY,
    //   secretkey: process.env.IYZICO_SECRET_KEY,
    //   uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
    // }

    // Geçici validasyon
    if (!body.orderId || !body.amount || !body.customerInfo) {
      return NextResponse.json({
        success: false,
        error: 'Eksik ödeme bilgileri',
        message: 'Sipariş ID, tutar ve müşteri bilgileri zorunludur'
      } as PaymentResponse, { status: 400 })
    }

    // Minimum tutar kontrolü (5 TL)
    if (body.amount < 5) {
      return NextResponse.json({
        success: false,
        error: 'Minimum tutar hatası',
        message: 'Minimum ödeme tutarı 5 TL olmalıdır'
      } as PaymentResponse, { status: 400 })
    }

    // TODO: İleride Iyzico API çağrısı yapılacak
    // const request = {
    //   locale: 'tr',
    //   conversationId: body.orderId,
    //   price: body.amount.toFixed(2),
    //   paidPrice: body.amount.toFixed(2),
    //   currency: body.currency || 'TRY',
    //   basketId: body.orderId,
    //   paymentGroup: 'PRODUCT',
    //   callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
    //   enabledInstallments: [2, 3, 6, 9],
    //   buyer: {
    //     id: 'BY789',
    //     name: body.customerInfo.name.split(' ')[0],
    //     surname: body.customerInfo.name.split(' ')[1] || '',
    //     gsmNumber: body.customerInfo.phone,
    //     email: body.customerInfo.email,
    //     identityNumber: '74300864791',
    //     lastLoginDate: new Date().toISOString(),
    //     registrationDate: new Date().toISOString(),
    //     registrationAddress: body.customerInfo.address.street,
    //     ip: request.ip,
    //     city: body.customerInfo.address.city,
    //     country: body.customerInfo.address.country,
    //     zipCode: body.customerInfo.address.postalCode
    //   },
    //   shippingAddress: {
    //     contactName: body.customerInfo.name,
    //     city: body.customerInfo.address.city,
    //     country: body.customerInfo.address.country,
    //     address: body.customerInfo.address.street,
    //     zipCode: body.customerInfo.address.postalCode
    //   },
    //   billingAddress: {
    //     contactName: body.customerInfo.name,
    //     city: body.customerInfo.address.city,
    //     country: body.customerInfo.address.country,
    //     address: body.customerInfo.address.street,
    //     zipCode: body.customerInfo.address.postalCode
    //   },
    //   basketItems: body.items.map((item, index) => ({
    //     id: item.id.toString(),
    //     name: item.title,
    //     category1: 'Giyim',
    //     itemType: 'PHYSICAL',
    //     price: (item.price * item.quantity).toFixed(2)
    //   }))
    // }

    // Şimdilik dummy response dön
    const response: PaymentResponse = {
      success: true,
      paymentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/mock?orderId=${body.orderId}`,
      orderId: body.orderId,
      message: 'Ödeme işlemi başlatıldı'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Payment API error:', error)
    
    const errorResponse: PaymentResponse = {
      success: false,
      error: 'Ödeme işleminde hata oluştu',
      message: 'Tekrar deneyin veya müşteri hizmetleri ile iletişime geçin'
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// GET /api/payment - Ödeme durumu sorgula (opsiyonel)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const orderId = url.searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({
        success: false,
        error: 'Sipariş ID bulunamadı'
      }, { status: 400 })
    }

    // TODO: Iyzico'dan ödeme durumu sorgula
    // const iyzipay = require('iyzipay');
    // iyzipay.checkoutForm.retrieve(request, function (err, result) {
    //   console.log(err, result);
    // });

    // Şimdilik dummy response
    return NextResponse.json({
      success: true,
      orderId,
      status: 'pending',
      message: 'Ödeme durumu sorgulandı'
    })

  } catch (error) {
    console.error('Payment status check error:', error)
    return NextResponse.json({
      success: false,
      error: 'Ödeme durumu sorgulanırken hata oluştu'
    }, { status: 500 })
  }
}

/*
 * Iyzico Entegrasyon Notları:
 * 
 * 1. .env.local dosyasına şu değişkenleri ekle:
 *    IYZICO_API_KEY=your_api_key
 *    IYZICO_SECRET_KEY=your_secret_key  
 *    IYZICO_URI=https://sandbox-api.iyzipay.com (test için)
 *    IYZICO_URI=https://api.iyzipay.com (production için)
 * 
 * 2. İyzico paketini yükle:
 *    npm install iyzipay
 * 
 * 3. Callback URL'i ayarla:
 *    /api/payment/callback route'unu oluştur
 * 
 * 4. Webhook endpoint oluştur:
 *    /api/payment/webhook route'unu oluştur
 * 
 * 5. Test kartları:
 *    4729150000000005 (Visa)
 *    5170410000000004 (Mastercard)
 */
