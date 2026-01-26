import Recommandation from "../components/shopPart/recommandation";
import Shop1 from "../components/shopPart/shop1";
import Shop2 from "../components/shopPart/shop2";
import Container from "../layout/container";

const Shop = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Shop1 />

            <div className="relative z-20 px-4 -mt-24 md:-mt-32 pb-24">
                <Container>
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 min-h-[800px]">
                        <Shop2 />
                    </div>
                </Container>
            </div>
            <Recommandation></Recommandation>
        </div>
    );
};

export default Shop;
