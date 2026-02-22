export type MenuItem = {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
};

export type MenuCategory = {
    category: string;
    items: MenuItem[];
};

export const menuData: MenuCategory[] = [
    {
        category: "makanan",
        items: [
            { id: "m1", name: "nasi goreng", price: "rp29.000", description: "nasi goreng khas rumah waduk dengan bumbu rahasia.", image: "/assets/nasi-goreng.jpg" },
            { id: "m2", name: "soto ubi", price: "rp25.000", description: "soto ubi hangat yang menggugah selera.", image: "/assets/soto-ubi.jpg" },
            { id: "m3", name: "bubur manado", price: "rp27.500", description: "bubur manado kaya rempah dan sayuran tradisional.", image: "/assets/bubur-manado.jpg" }
        ]
    },
    {
        category: "kopi",
        items: [
            { id: "k1", name: "kopi susu", price: "rp18.000", description: "perpaduan espresso dan susu segar khas rumah waduk.", image: "/assets/kopi-susu.jpg" },
            { id: "k2", name: "kopi hitam", price: "rp15.000", description: "kopi hitam seduh manual dari biji pilihan.", image: "/assets/kopi-hitam.jpg" },
            { id: "k3", name: "es kopi gula aren", price: "rp20.000", description: "kopi susu dengan manisnya gula aren asli nusantara.", image: "/assets/es-kopi-gula-aren.jpg" }
        ]
    },
    {
        category: "minuman",
        items: [
            { id: "d1", name: "thai tea", price: "rp20.000", description: "teh khas thailand yang manis dan menyegarkan.", image: "/assets/thai-tea.jpg" },
            { id: "d2", name: "lemon tea", price: "rp15.000", description: "perpaduan teh dan perasan lemon segar alami.", image: "/assets/lemon-tea.jpg" },
            { id: "d3", name: "cincau gula aren", price: "rp18.000", description: "kesegaran es cincau dengan kuah gula aren.", image: "/assets/cincau.jpg" },
            { id: "d4", name: "milk tea", price: "rp20.000", description: "teh susu klasik nan creamy.", image: "/assets/milk-tea.jpg" },
            { id: "d5", name: "green tea", price: "rp20.000", description: "teh hijau premium dengan aroma khas.", image: "/assets/green-tea.jpg" },
            { id: "d6", name: "brown sugar milk", price: "rp20.000", description: "susu segar dipadu brown sugar syrup.", image: "/assets/brown-sugar-milk.jpg" }
        ]
    },
    {
        category: "camilan",
        items: [
            { id: "s1", name: "kentang goreng", price: "rp18.000", description: "kentang goreng renyah dengan berbagai pilihan saus.", image: "/assets/kentang-goreng.jpg" },
            { id: "s2", name: "pisang peppe", price: "rp18.000", description: "pisang geprek renyah khas makassar dengan sambal terasi.", image: "/assets/pisang-peppe.jpg" },
            { id: "s3", name: "roti bakar", price: "rp15.000", description: "roti bakar hangat dengan aneka selai pilihan.", image: "/assets/roti-bakar.jpg" },
            { id: "s4", name: "cheese stick", price: "rp18.000", description: "stik keju lumer dan renyah.", image: "/assets/cheese-stick.jpg" },
            { id: "s5", name: "banana roll", price: "rp15.000", description: "gulungan pisang manis berbalut kulit lumpia krispi.", image: "/assets/banana-roll.jpg" }
        ]
    }
];
