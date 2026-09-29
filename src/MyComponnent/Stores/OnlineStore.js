import React from 'react'
import "./OnlineStore.css";
import img1 from '../Img/store-1.webp'
import img2 from '../Img/store-2.webp'
import img3 from '../Img/store-3.webp'
import img4 from '../Img/store-4.webp'

const stores = [
    {
        id: 1,
        name: "Broadway Store",
        image: img1,
    },
    {
        id: 2,
        name: "Valencia Store",
        image: img2,
    },
    {
        id: 3,
        name: "Emeryville Store",
        image: img3,
    },
    {
        id: 4,
        name: "Alameda Store",
        image: img4,
    },
];

function OnlineStore() {
    return (
        <div className='online-store mt-4'>
            <div className="container bg-light p-4">
                <h4>Online Store of Household Appliances and Electronics</h4>
                <p>The online store of equipment and electronics is one of the leading online stores. The band was released in 25 volumes. During this time, our team sent 228 cypemapkets and managed to create a powerful, fast-working online store. The range of online supply points is huge and covers all company categories available for convenience stores.</p>
                <br />
                <p>In 2019, we presented a new border policy strategy that covers all aspects of the company’s activities – corporate style, delivery, and consultant work.</p>
                <div className="row g-4 mt-2">
                    {stores.map((store) => (
                        <div className="col-md-3" key={store.id}>
                            <div className="store-card position-relative overflow-hidden rounded-4">
                                <img
                                    src={store.image}
                                    alt={store.name}
                                    className="img-fluid store-img"
                                />
                                <div className="store-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3">
                                    <h5 className="text-white fw-bold mb-2">{store.name}</h5>
                                    <button className="btn btn-primary btn-sm">View Store</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h5 className='mt-3'>A wonderful serenity has taken possession of my entire soul</h5>
                <p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.</p>
                <h5>When, while the lovely valley teems with vapour around me</h5>
                <p>little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!</p>
                <h5>Online shopping that really is convenient</h5>
                <p>The car parts and everything you may need for repairs and regular maintenance of your vehicle are listed in a convenient and comprehensive catalogue. The innovative search – by name, item ID or OEM number will help you to find automotive parts easily.
                </p>
                <p>
                    You can choose whichever payment method is most convenient for you from among the various options. Have any questions? Our support service specialists are always on hand to help. Picking and buying car parts with us is an enjoyable experience!</p>

            </div>
        </div>
    )
}

export default OnlineStore
