import { defineStore } from "pinia";
import { ref, watch, computed} from "vue";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore('coupon', () => {
    const cart = useCartStore()
    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage = ref(0)
    const discount = ref(0)

    const VALID_COUPONS = [
        {name: '10DESCUENTO', discount: .10},
        {name: '20DESCUENTO', discount: .20}
    ]

    watch(discountPercentage, () => {
        discount.value = (cart.total * discountPercentage.value).toFixed(2)
    })

    function applyCoupon(){
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value)){
            couponValidationMessage.value = 'Aplicando...'

            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
                couponValidationMessage.value = '¡Descuento Aplicado!'
            }, 3000);
        }else{
            couponValidationMessage.value = 'No existe ese cupon'
        }

        setTimeout(() => {
            couponValidationMessage.value = ''
        }, 6000);
    }

    function $reset(){
        couponInput.value = ''
        couponValidationMessage.value = ''
        discountPercentage.value = 0
        discount.value = 0
    }

    const isValidCoupon = computed(() => discountPercentage.value > 0 )

    return{
        couponInput,
        applyCoupon,
        couponValidationMessage,
        discount,
        isValidCoupon,
        $reset
    }

})