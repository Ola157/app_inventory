const initialState = {
    goods: [],
    cart: [],
    isLogged: false,
    isClickRegister: false,
    records: [],
    personalDetails: {},
    address: [],
    searched: [],
    viewed: {},
    message: '',
    cartRecord: [],
    categories: {
        grocery: [
            "Shop groceries",
            "Shop homeware",
            "My account",
            "Delivery saver",
            "Inspiration and events",
            "Favourites",
        ],
        clothing: [
            "Browse F&F clothing",
            "Browse women clothing",
            "Browse school uniform",
            "Browse men clothing",
            "Browse kids clothing",
        ],
        clubcard: [
            "Browse Clubcard",
            "Clubcard plus",
            "Join Clubcard",
            "About Clubcard",
            "Collect points",
            "Spend vouchers",
        ],
        bank: [
            "Browse Express bank",
            "Clubcard pay+",
            "Credit cards",
            "Loans",
            "Savings",
            "Car insurance",
        ],
        mobile: [
            "Shop all mobile",
            "Pay monthly phones",
            "SIM only contracts",
            "Pay as you go phones",
            "Pay as you go SIMs",
            "SIM free phones",
        ],
        recipe: [
            "Recipe inspiration",
            "Under 30 minute meals",
            "Healthy recipes",
            "Budget meals",
            "Baking",
            "Food Love Stories",
        ],
        grocerypage: [
            "Fresh Food",
            "Bakery",
            "Frozen Food",
            "Treats & Snacks",
            "Food Cupboard",
            "Drinks",
            "Baby & Toddler",
            "Health && Beauty",
            "Pets",
            "Household",
            "Home & Ents",
            "Easter",
        ],
        favorite: [
        ],
        meals: [
            "Breakfast ideas",
            "Lunch ideas",
            "Dinner ideas",
            "Plant based & vegetarian",
            "Recipes - Tesco Real food",
        ],
        offers: [

        ],
        event: [],
        saver: [

        ]
    },
    department: {
        'Fresh Food': [
            'All Fresh Food',
            'Fresh Fruit',
            'Fresh Vegetables',
            'Fresh Salad, Coleslaw & Sandwich Fillers',
            'Chilled Vegetarian & Vegan',
            'Juice & Smoothies',
            'Milk, Butter & Eggs',
            'Cheese',
            'Yogurts',
            'Dairy Free & Dairy Alternatives',
            'Finest Fresh Food',
            'Fresh Meat & Poultry',
            'Chilled Fish & Seafood'
        ],
        'Bakery': [
            'All Bakery',
            'Easter Cakes & Hot Cross Buns',
            'Bread & Rolls',
            'Wraps, Pittas, Naan & Thins',
            'Crumpets, Muffins & Pancakes',
            'Croissants, Brioche & Pastries',
            'Teacakes, Fruit Loaves & Scones',
            'Doughnuts, Cookies & Muffins',
            'Cakes, Cake Bars, Slices & Pies',
            'Free From Bakery',
            'From Our Bakery',
            'Finest Bakery',
            'Offers on Bakery'],
        'Frozen Food': [
            'All Frozen Food',
            'Vegan',
            'Vegetarian',
            'Vegetables',
            'Chips, Potatoes & Sides',
            'Meat & Poultry',
            'Fish & Seafood',
            'Party Foods & Garlic Breads',
            'Pies, Bakes & Sausage Rolls',
            'Pizza',
            'Ready Meals',
            'Yorkshire Puddings & Stuffing',
            'Fruit & Pastry'],
        'Treats & Snacks': [
            'All Treats & Snacks',
            'Great Night In',
            'Chocolate, Sweets, Mints & Chewing Gum',
            'Crisps, Snacks, Nuts & Popcorn',
            'Biscuits & Cereal Bars',
            'Meat & Cheese Snacking',
            'Dried Fruit, Nuts, Nutrient Powders & Seeds',
            'Crackers & Crispbreads',
            'Cake Bars, Slices & Bakes',
            'Last Chance To Buy',
            'Offers on Treats & Snacks'],
        'Food Cupboard': [
            'All Food Cupboard',
            'Easter Chocolate & Eggs',
            'Dried Fruit, Nuts, Nutrient Powders & Seeds',
            'Cereals',
            'Chocolate, Sweets, Mints & Chewing Gum',
            'Crisps, Snacks, Nuts & Popcorn',
            'Biscuits & Cereal Bars',
            'Crackers & Crispbreads',
            'Free From',
            'Tins, Cans & Packets',
            'Noodle Pots & Instant Snack Meals',
        ],
        'Drinks': [
            'All Drinks',
            'Juices & Smoothies',
            'Fizzy & Soft Drinks',
            'Water',
            'Squash & Cordial',
            'Adult Soft Drinks & Mixers',
            'Kids Drinks',
            'Sports, Energy & Wellness Drinks',
            'Milk & Milkshakes',
            'On The Go Drinks',
            'Tea',
            'Coffee',
            'Hot Chocolate & Malted Drinks'],
        'Baby & Toddler': [
            'All Baby & Toddler',
            'Baby, Toddler & Kids ',
            'Nappies & Pants',
            'Baby & Toddler Wipes',
            'Baby & Toddler Toiletries',
            'Baby & Toddler Healthcare',
            'Baby & Toddler Milk',
            'Baby & Toddler Food',
            'Toilet Training',
            'Mum to Be',
            'Breast Feeding Accessories',
            'Baby Bottles & Accessories',
            'Baby Weaning & Accessories'],
        'Health && Beauty': ['All Health & Beauty',
            `Kid's Zone`,
            'Shampoo',
            'Conditioner',
            'Haircare & Styling',
            'Hair Colourants & Dyes',
            'Shower, Bath & Hand Hygiene',
            'Deodorants',
            'Toothpaste, Mouthwash & Toothbrush',
            `Women's Toiletries`,
            `Men's Toiletries`,
            'Face Skincare',
            'Body Skincare'],
        'Pets': [
            'All Pets',
            'Cat Food & Accessories',
            'Dog Food & Accessories',
            'Small Animal, Fish & Bird',
            'Pet Cleaning',
            'Last Chance To Buy',
            'Offers on Pets'],
        'Household': [
            'All Household',
            'Laundry',
            'Kitchen Roll',
            'Toilet Roll',
            'Facial Tissue & Hand Wipes',
            'Cleaning',
            'Kitchen Cleaners',
            'Bathroom Cleaners & Toilet Care',
            'Dishwashing',
            'Air Fresheners & Home Fragrance',
            'Household Essentials',
            'Food Storage',
            'Lightbulbs'],
        'Home & Ents': [
            'All Home & Ents',
            'Garden & Outdoor',
            'Toys & Games',
            'Greeting Cards',
            'Electrical',
            'Paperchase',
            'Stationery, Arts & Crafts',
            'National Lottery',
            'Books',
            'Batteries',
            'Cooking & Dining',
            'Bedding',
            'Bathroom Accessories & Towels'],
        'Easter': [
            'All Easter',
            'Easter Eggs',
            'Easter Chocolates & Treats',
            'Easter Cakes & Hot Cross Buns',
            'Easter Egg Hunt',
            'Offers on Easter'],
        'Dinner ideas': [
            `That's dinner sorted`,
            'Great nights in',
            'Finest Dinner for Two only £12: Main meal, side, dessert and drinks']
    },

    item_department: {
        'Fresh Fruit': ['All Fresh Fruit',
            'Bananas',
            'Apples & Pears',
            'Berries & Cherries',
            'Oranges, Lemons & Citrus Fruit',
            'Grapes',
            'Peaches, Nectarines, Plums & Apricots',
            'Melons & Pineapples',
            'Mango, Kiwi & Exotic Fruit',
            'Rhubarb',
            'Fruit Pots, Platters & Packs',
            'Dried Fruit, Nuts & Seeds',
            'Organic Fruit & Nuts',
            'Offers on Fresh Fruit'],
        'Fresh Vegetables': [
            'Fresh Flowers',
            'Potatoes & Sweet Potatoes',
            'Onions & Leeks',
            'Carrots & Root Vegetables',
            'Broccoli & Cauliflower',
            'Spinach, Cabbages & Greens',
            'Courgettes, Aubergines & Squash',
            'Mushrooms',
            'Peas, Beans, Sweetcorn & Asparagus',
            'Fresh Chillies, Herbs, Garlic & Ginger',
            'International Vegetables',
            'Stir Fry Vegetables, Sauce & Noodles',
            'Prepared Vegetables',
            'Offers on Fresh Vegetables'],
        'Fresh Salad, Coleslaw & Sandwich Fillers': [
            'Lettuce & Salad bags',
            'Tomatoes',
            'Cucumber',
            'Celery',
            'Peppers',
            'Avocado',
            'Spring Onions, Radish & Beetroot',
            'Salad Dressings & Croutons',
            'Salad Pots & Pasta Salad',
            'Fresh Chillies, Herbs, Garlic & Ginger',
            'Organic Salad',
            'Coleslaw & Potato Salad',
            'Houmous & Dips',
            'Sandwich Fillers',
            'Offers on Fresh Salad, Coleslaw & Sandwich Fillers'],
        'Chilled Vegetarian & Vegan': [
            'Sausages',
            'Burgers',
            'Escalopes & Nuggets',
            'Kebabs, Strips & Pieces',
            'Mince',
            'Bacon Alternatives',
            'Steaks',
            'Meatball Alternatives',
            'Roasts',
            'Tofu & Tempeh',
            'Deli Slices, Ready to Eat Pieces & Falafels',
            'Vegan Cheese Alternatives',
            'Ready Meals',
            'Lunch Pots & Soup',
            'Pies, Pasties & Sausage Rolls',
            'Vegan Pizza & Pasta',
            'Vegan Desserts',
            'Egg Alternative',
            'Offers on Chilled Vegetarian & Vegan'],
        'Juice & Smoothies': [
            'Fresh Juice',
            'Long Life Juice',
            'Coconut Water',
            'Smoothies & Added Benefit Juices',
            'Kids Juices & Smoothies',
            'Offers on Juice & Smoothies'],
        'Milk, Butter & Eggs': [
            'Milk',
            'Butters, Spreads & Margarine',
            'Fresh Cream & Custard',
            'Baking & Cooking',
            'Eggs',
            'Dairy Free Drinks',
            'Dairy Free Butter, Spreads & Margarine Alternatives',
            'Dairy Free Cream & Custard Alternatives',
            'Milkshakes & Iced Coffee',
            'Offers on Milk, Butter & Eggs'],
        'Easter Cakes & Hot Cross Buns': [
            'Hot Cross Buns',
            'Easter Cakes',
            'Offers on Easter Cakes & Hot Cross Buns'],
        'Bread & Rolls': [
            'White Bread',
            'Brown & Wholemeal Bread',
            'Seeded Bread',
            'Half & Half Bread',
            'Small Loaves',
            'Bagels',
            'Batons',
            'Bread Rolls',
            'Part Baked Bread',
            'Speciality Breads',
            'Bread From Our Bakery',
            'Offers on Bread & Rolls'
        ],
        'Wraps, Pittas, Naan & Thins': [
            'Naan',
            'Pitta',
            'Sandwich Thins',
            'Wraps',
            'Flatbreads',
            'Offers on Wraps, Pittas, Naan & Thins'],
        'Crumpets, Muffins & Pancakes': ['Crumpets',
            'Muffins',
            'Potato Cakes',
            'Pancakes',
            'Waffles',
            'Offers on Crumpets, Muffins & Pancakes'
        ],
        'Croissants, Brioche & Pastries': [
            'Croissants',
            'Brioche',
            'Pain au Chocolat',
            'Pastries',
            'Offers on Croissants, Brioche & Pastries'],
        'Vegan': ['Vegan Sausages, Bacon & Burgers',
            'Vegan Mince, Nuggets & Pieces',
            'Vegan Fillets & Fish - Free',
            'Pies & Savouries',
            'Meals, Pizza & Falafel',
            'Vegan Ice Cream',
            'Offers on Vegan'],
        'Vegetarian': [
            'Vegetarian Sausages, Bacon & Burgers',
            'Vegetarian Mince, Nuggets & Pieces',
            'Vegetarian Fillets & Fish - Free',
            'Pies & Savouries',
            'Meals, Pizza & Falafel',
            'Offers on Vegetarian'
        ],
        'Vegetables': [
            'Prepared Vegetables',
            'Peas, Sweetcorn & Green Beans',
            'Mixed Vegetables',
            'Broccoli, Cauliflower, Carrots & Sprouts',
            'Steamed Rice & Vegetables',
            'Offers on Vegetables'],
        'Chips, Potatoes & Sides': [
            'Chips & French Fries',
            'Hash Browns, Onion Rings & Croquettes',
            'Roast Potatoes & Yorkshire Puddings',
            'Jacket & Mashed Potatoes',
            'Waffles, Shapes & Wedges',
            'Sweet Potato & Vegetable Chips',
            'Offers on Chips, Potatoes & Sides'],
        'Meat & Poultry': [
            'Coated Chicken & Turkey',
            'Chicken',
            'BBQ Meat & Chicken',
            'Burgers',
            'Sausages',
            'Beef',
            'Lamb',
            'Pork & Gammon',
            'Duck & Goose',
            'Meal Kits',
            'Offers on Meat & Poultry'],
        'Great Night In': [
            'Sharing Chocolate',
            'Sharing Crisps',
            'Popcorn',
            'Ice Cream',
            'Pretzels & Nuts',
            'Offers on Great Night In'],
        'Chocolate, Sweets, Mints & Chewing Gum': [
            'Multipack Chocolate Bars',
            'Chocolate Boxes & Gifts',
            'Dark Chocolate',
            'Chocolate Pouches & Bags',
            'Single Chocolate Bars & Sweets',
            'Sharing Chocolate Bars',
            'Traditional Sweets & Confectionery',
            'Jelly & Chewy Sweets',
            'Kids Sweets',
            'Mints',
            'Chewing Gum',
            'Offers on Chocolate, Sweets, Mints & Chewing Gum'],
        'Crisps, Snacks, Nuts & Popcorn': [
            'Under 100 Calories Snacks',
            'Multipack Crisps & Snacks',
            'Better Snacking',
            'Popcorn',
            'Sharing Crisps & Snacks',
            'Single Crisps & Snacks',
            'Meat Snacking',
            'Nuts & Nut Mixes',
            'Offers on Crisps, Snacks, Nuts & Popcorn'],
        'Biscuits & Cereal Bars': [
            'Under 100 Calories Biscuits & Cereal Bars',
            'Everyday Biscuits',
            'Cookies',
            'Shortbread',
            'Cereal Bars & On the Go Snack Bars',
            'Continental Biscuits',
            'Chocolate Biscuits & Jaffa Cakes',
            'Chocolate Biscuit Bars & Mini Biscuits',
            'Biscuit Assortments',
            'Offers on Biscuits & Cereal Bars'],
        'Easter Chocolate & Eggs': ['Mini Easter Eggs & Pouches',
            'Easter Eggs',
            'Easter Chocolates & Treats',
            'New & Exclusive',
            'Easter Egg Hunt Chocolates',
            'Offers on Easter Chocolate & Eggs'],
        'Dried Fruit, Nuts, Nutrient Powders & Seeds': [
            'Fruit Snacks',
            'Dried Fruit, Nut & Seed Mixes',
            'Fruit & Nut Bars',
            'Plain Nuts & Seeds',
            'Dried Fruit',
            'Nutrient Powders',
            'Organic',
            'Roasted, Salted & Flavoured Nuts',
            'Offers on Dried Fruit, Nuts, Nutrient Powders & Seeds'],
        'Cereals': [
            'Corn Flakes',
            'Family Favourite Cereal',
            'Chocolate Cereal',
            'Wheat Cereal',
            'Bran, Oat & Flake Cereal',
            'Granola',
            'Free From Cereal',
            'Crisp & Clusters Cereal',
            'Muesli',
            'Porridge & Oats',
            'On The Go Breakfast',
            'Lifestyle Choice Cereal',
            'Offers on Cereals'],
        'Chocolate, Sweets, Mints & Chewing Gum': [
            'Multipack Chocolate Bars',
            'Chocolate Boxes & Gifts',
            'Dark Chocolate',
            'Chocolate Pouches & Bags',
            'Single Chocolate Bars & Sweets',
            'Sharing Chocolate Bars',
            'Traditional Sweets & Confectionery',
            'Jelly & Chewy Sweets',
            'Kids Sweets',
            'Mints',
            'Chewing Gum',
            'Easter Treats & Eggs',
            'Offers on Chocolate, Sweets, Mints & Chewing Gum']
    },

    baseComponentOne: [
        {
            image: './assets/tiddlerEvent.jpeg',
            h3: 'The Baby & Toddler Event is here',
            p: `Make big savings on your little one's essentials with Clubcard Prices`,
            span: 'Shop the event'
        }, {
            image: './assets/newAndTrending.jpeg',
            h3: `New and trending`,
            p: 'Try the latest trends and new ranges',
            span: 'Shop the latest'
        },
        {
            image: './assets/makeup.jpeg',
            h3: 'Makeup a new you',
            p: 'Whether its a simple eyeliner or a luscious lippy, get the look you want',
            span: 'Explore makeup'
        },
        {
            image: './assets/deliveryEasy.jpg',
            h3: 'Delivery Saver',
            p: 'Save up to £176 on your delivery costs',
            span: 'Sign up'
        }],
    isMenu: false,
    isGMenu: false,
    isSearch: false,
    isStore: false,
    isHelp: false,
    isAbout: false,
    isWebsite: false,
    isLink: false,
    isPause: false
}

const myReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'REG_SUCCESS':
            return {
                ...state,
                isClickRegister: action.payload.value
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLogged: true
            }

        case "LOG_OUT":
            let allGoods = state.goods.map(item => item.addItem ? ({
                ...item,
                addItem: false,
                userQuantity: 0
            }) : item)

            return {
                ...state,
                cart: [],
                goods: allGoods,
                isLogged: false,
                records: [],
                personalDetails: {},
                address: {},
                searched: [],
                viewed: {},
                message: '',
                total: '',
                cartRecord: []
            }

        case "ALL_GOODS":
            const { goods } = action.payload;
            let updatedCart;

            if (state.cart.length) {
                updatedCart = state.goods.map((good) => {
                    const matchedItem = state.goods.find((item) => good.itemId === item._id);
                    return {
                        ...good,
                        userQuantity: matchedItem ? matchedItem.userQuantity : good.userQuantity,
                        addItem: matchedItem ? matchedItem.addItem : good.addItem,
                    };
                });
            }
            return {
                ...state,
                searched: [],
                goods: updatedCart
                    ? updatedCart
                    : goods.map((good) => ({
                        ...good,
                        userQuantity: 0,
                        _id: good._id,
                        addItem: false,
                    })),
            };

        case 'MESSAGE':
            const { message } = action.payload
            return {
                ...state,
                message
            }

        case "VIEWED_ITEM":
            const { viewed } = action.payload
            const matchedProd = state.goods.find(item => item._id === viewed._id)
            if (matchedProd) {
                viewed.userQuantity = matchedProd.userQuantity
                viewed.addItem = matchedProd.addItem
            }
            return {
                ...state,
                viewed: viewed
            }

        case "SEARCHED_ITEM":
            const { items } = action.payload
            let updateSearched = []
            for (const searched of items) {
                const matchedItem = state.goods.find(item => item._id == searched._id);
                if (matchedItem) {
                    updateSearched.push(matchedItem)
                }
            }
            return {
                ...state,
                searched: items.length ? updateSearched : []
            }

        case "HANDLE_CARTFETCH":
            const { cart, kind } = action.payload
            const total = cart.reduce((acc, item) => acc + item.cost, 0);
            return {
                ...state,
                goods: kind === 'updatequantity' && cart.length ?
                    state.goods.map(good => {
                        const matchedCartItem = cart.find(cartItem => cartItem.itemId === good._id);
                        if (matchedCartItem) {
                            return {
                                ...good,
                                userQuantity: matchedCartItem.userQuantity,
                                addItem: matchedCartItem.addItem
                            };
                        }
                        return good;
                    }) : state.goods,
                cart,
                total
            }

        case "HANDLE_CART":
            const { userQuantity, itemId } = action.payload;
            const updatingCart = state.goods.map(good => {
                if (good._id === itemId) {
                    const updatedGood = { ...good };

                    updatedGood.addItem = userQuantity > 0 ? true : userQuantity < 1 ? false : updatedGood.addItem;

                    updatedGood.userQuantity = userQuantity;

                    return updatedGood;
                }
                return good;
            });

            return {
                ...state,
                goods: updatingCart,
                viewed: state.viewed ? updatingCart.find(item => itemId === item._id) : state.viewed,
                searched: state.searched.length > 0 ? state.searched
                    .map(searched => updatingCart.find(item => searched._id === item._id))
                    .filter(reViewed => reViewed) : state.searched,
                total: state.cart.length ? state.cart.reduce((acc, item) => acc + item.cost, 0) : state.total
            };

        case "REMOVE_ITEM":
            let updatedGood = state.goods.map(good => good._id == action.payload.itemId ?
                ({
                    ...good,
                    userQuantity: 0,
                    addItem: false
                }) : good)

            let cartFilter = state.cart.filter(good => good.itemId != action.payload.itemId)
            return {
                ...state,
                goods: updatedGood,
                cart: cartFilter
            }

        case "CLEAR_CART":
            let updateCleared = state.goods.map(good => ({
                ...good,
                userQuantity: 0,
                addItem: false,
            }))
            return {
                ...state,
                goods: updateCleared,
                cart: [],
                total: ''
            }

        case "CHECK_OUT":
            return {
                ...state,
                goods: state.goods.map((good) => ({
                    ...good,
                    userQuantity: 0,
                    addItem: false
                })),
                cart: []
            }

        case "ALL_CART_RECORDS":
            return {
                ...state,
                records: action.payload.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                })
            }

        case 'CART_RECORD':
            const { cartRecord } = action.payload
            return {
                ...state,
                cartRecord
            }

        case "ADDRESS":
            return {
                ...state,
                address: action.payload
            }

        case "PERSONAL_DETAILS":
            let { title, email, firstName, lastName, mobileNumber, alternativeNumber } = action.payload
            return {
                ...state,
                personalDetails: { title, email, firstName, lastName, mobileNumber, alternativeNumber }
            }

        case "LINK":
            return {
                ...state,
                isLink: !state.isLink
            }

        case "HELP":
            return {
                ...state,
                isHelp: !state.isHelp
            }

        case "ABOUT":
            return {
                ...state,
                isAbout: !state.isAbout
            }

        case "WEBSITE":
            return {
                ...state,
                isWebsite: !state.isWebsite
            }

        case "STORE":
            return {
                ...state,
                isStore: !state.isStore,
                isMenu: false,
                isSearch: false,
                isSignIn: false
            }

        case "MENU":
            return {
                ...state,
                isMenu: !state.isMenu,
                isStore: false,
                isSearch: false,
                isSignIn: false,
            }
        case "ISPAUSE":
            let { boolean } = action.payload
            return {
                ...state,
                isPause: boolean,
            }

        case "GMENU":
            return {
                ...state,
                isGMenu: !state.isGMenu,
                isStore: false,
                isSearch: false,
                isSignIn: false,
                isMenu: false
            }

        case "SEARCH":
            return {
                ...state,
                isSearch: !state.isSearch,
                isStore: false,
                isMenu: false,
                isSignIn: false
            }
        case "SIGNIN":
            return {
                ...state,
                isSignIn: !state.isSignIn,
                isSearch: false,
                isStore: false,
                isMenu: false
            }
        case "NAV":
            return {
                ...state,
                isSearch: false,
                isStore: false,
                isMenu: false,
                isGMenu: false,
                activeCategory: null
            }

        case 'CATEGORY':
            const { category } = action.payload


            let categoryArray;
            let isEmpty;

            if (category) {
                categoryArray = state.categories[category];
                isEmpty = categoryArray.length === 0;
            }

            return {
                ...state,
                activeDepartment: null,
                activeItemDepartment: null,
                activeCategory: state.activeCategory === category || category == null || isEmpty ?
                    null :
                    category
            }

        case 'DEPARTMENT':
            const { department } = action.payload
            return {
                ...state,
                activeDepartment: null,
                activeItemDepartment: null,
                activeDepartment: state.activeDepartment === department ?
                    null :
                    department
            }

        case 'ITEMDEPARTMENT':
            const { itemDepartment } = action.payload
            return {
                ...state,
                activeItemDepartment: state.activeItemDepartment === itemDepartment ?
                    null :
                    itemDepartment,
            }

        case 'STOREMENU-LANDINGPAGE':
            return {
                ...state,
                storeNavMenu: [{ category: 'grocery', name: 'Groceries' },
                { category: 'clothing', name: 'F&F Clothing' },
                { category: 'clubcard', name: 'Express Clubcard' },
                { category: 'bank', name: 'Express Bank' },
                { category: 'mobile', name: 'Express Mobile' },
                { category: 'recipe', name: 'Recipes' }],

                slides: [
                    {
                        image: './carouselAsset/Double-points.jpeg',
                        h4: 'Collect double Clubcard points',
                        p: 'Available in-store, online and on Tesco fuel',
                        b: 'See all T& Cs',
                        bg: 'rgb(0, 83, 159)'
                    },
                    {
                        image: './carouselAsset/GreatValue2.jpeg',
                        h4: 'Great Value Event',
                        p: `Unlock the power to lower prices on basics with your Clubcard`,
                        b: 'Spend less now',
                        bg: 'rgb(0, 83, 159)'
                    }, {
                        image: './carouselAsset/grow-savings.jpg',
                        h4: 'Look after your money with Tesco Bank',
                        p: 'Check out the full range of Savings Accounts.Eligibility criteria apply.',
                        b: 'Find out more',
                        bg: 'rgb(0, 83, 159)',
                        abs: 'Grow Your Savings'
                    }
                ],
                advert: {
                    p1: 'How did you shop in 2023?',
                    p2: 'See how you shopped in 2023 with Clubcard Unpacked',
                    image: './assets/2555.jpg',
                    bg: 'rgb(0, 83, 159)'
                },
                baseComponentTwo: [
                    {
                        image: './assets/gymclubs.jpeg',
                        h3: 'Save 25% on F&F Active with Clubcard',
                        p: 'Update your gym gear with our brand new F & F Active range, designed to help you feel great on the move*',
                        span: 'Browse F&F'
                    },
                    {
                        image: './assets/breakfastIdeas.jpeg',
                        h3: `Champion breakfast ideas`,
                        p: 'Kick-start your mornings with a proper brekkie',
                        span: 'Get inspired'
                    },
                    {
                        image: './assets/Vegan-recipes.jpeg',
                        h3: 'Vegan recipes',
                        p: 'Going plant based this January ? Check out these easy and delicious recipes',
                        span: 'See the recipes'
                    },
                    {
                        image: './assets/Inspo.jpeg',
                        h3: 'Need inspiration?',
                        p: 'Feel inspired for the year ahead with brands, money- saving tips, events and offers',
                        span: 'Find out more'
                    }],
                page: 'LANDINGPAGE'
            }

        case 'STOREMENU-GROCERYPAGE':
            return {
                ...state,
                storeNavMenu: [
                    { category: 'grocerypage', name: 'Groceries' },
                    { category: 'favorite', name: 'My Favorites' },
                    { category: 'meals', name: 'Meals and Recipes' },
                    { category: 'offers', name: 'Special Offers' },
                    { category: 'event', name: 'Great Value Event' },
                    { category: 'saver', name: 'Delivery Saver' }
                ],
                slides: [
                    {
                        image: './carouselAsset/GreatValue.avif',
                        h4: 'Great Value Event',
                        p: 'Fill your cupboard with snacks, drinks and essentials for less',
                        b: 'Shop and save',
                        bg: 'rgb(0, 83, 159)',
                    },
                    {
                        image: './carouselAsset/LowNonAlcohol.avif',
                        h4: 'See Whats New and Trending',
                        p: `Discover delicious new products and award-winners at Tesco`,
                        b: 'Try something new',
                        bg: 'rgb(0, 83, 159)'
                    }, {
                        image: './carouselAsset/plant-dish.jpg',
                        h4: 'Turning over a new leaf ?',
                        p: 'Shop delicious plant based dishes from our Plant Chef Range',
                        b: 'Shop plant based',
                        bg: 'rgb(218, 25, 132)'
                    }
                ],
                advert: {
                    p1: 'The Baby & Toddler Event',
                    p2: 'From bump to baby basics, save more on essentials',
                    image: './assets/baby-toddler.jpg',
                    bg: 'rgb(40, 164, 148)'
                },
                baseComponentTwo: [
                    {
                        image: './assets/TradeStamp-poultry.avif',
                        h3: 'Meat, fish and poultry on Clubcard Prices',
                    },
                    {
                        image: './assets/Fruitveg.jpg',
                        h3: `Fresh 5 fruit and vegetables`
                    },
                    {
                        image: './assets/OnlineOnlyOffers-Frozen.avif',
                        h3: 'Online only frozen food offer',
                    },
                    {
                        image: './assets/Fridge-Backup.jpg',
                        h3: 'Weekly fridge favourites?',
                    }],

                offers: [{
                    image: './assets/Snacks.avif',
                    name: 'Snacks and treats'
                },
                {
                    image: './assets/Andrex.avif',
                    name: 'Andrex 9-roll',
                    price: '6.50',
                    clubP: '5'
                },
                {
                    image: './assets/HotcrossBuns.avif',
                    name: '2 for £2.50 Finest hot cross buns'
                },
                {
                    image: './assets/Coke.jpg',
                    name: 'Coke 24-pack',
                    price: '10.50',
                    clubP: '7'
                }],
                page: 'GROCERYPAGE'
            }


    }
    return state
}
export default myReducer;