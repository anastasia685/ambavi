import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import StoreItem from './Item/Item';

import classes from './Store.module.css';

const Store = () => {
  const initialItems = [
    { id: 1, title: 'Title1', price: 10 },
    { id: 2, title: 'Title2', price: 20 },
    { id: 3, title: 'Title3', price: 30 },
    { id: 4, title: 'Title4', price: 40 },
    { id: 5, title: 'Title5', price: 50 },
  ];
  const [items, setItems] = useState(initialItems);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 style={{ fontFamily: 'Calligraphy', marginBlockEnd: '0.3em' }}>
          maRazia
        </h1>
        <p style={{ marginBlockStart: '0.3em' }}>
          ამბავის მაღაზია, პროექტის კონცეფციის ნაწილია. თანამედროვე სამყაროში,
          კონკრეტული მუსიკის მოსასმენად ფულის გადახდა აღარ გჭირდებათ. ეს ძალიან
          კარგია და საშუალებას გვაძლევს ჩვენი ცხოვრება სულ უფრო მეტი მუსიკით
          იყოს სავსე, თუმცა ხშირად, როდესაც ჩვენ გვინდა ვინმეს არა მხოლოდ
          მუსიკა, არამედ ჩვენი ემოცია, როგორც სახსოვარი გავუზიაროთ, ამის
          შესაძლებლობა აღარ გვეძლევა. ამიტომ ამბავმა გადაწყვიტა თავისი მუსიკა,
          ლამაზ, პრაქტიკულ და გაზიარებად აქსესუარებად გარდაექმნა, რომელიც
          შეგიძლია თან ატარო, როგორც შენი სტილის, ცხოვრების წესის, ფილოსოფიის
          გამომხატველი და თავისუფლად გაუზიარო სხვებსაც.
        </p>
        <h1
          className={classes.secondaryHeader}
        >
          გახდი ამბავის პარტნიორი:
        </h1>
        <p>
          ჩვენ გადავწყვიტეთ ამბავის კარი ფართოდ გაგვეღო ყველა ადამიანისთვის,
          ვისაც მოსწონს ამბავის სამყარო, ვის გულსაც ეხება ჩვენი შემოქმედება და
          ვინც იზიარებს ჩვენ ფასეულობებს. ამისთვის შევქმენით ამბავის
          მონეტიზაციის სისტემა. მისი საშუალებით თქვენ შეგიძლიათ იყიდოთ არა
          ამბავის რომელიმე კონკრეტული შემოქმედება, არამედ თავად გახდეთ ამბავის
          ნაწილი.{' '}
          <mark
            style={{
              backgroundColor: 'rgba(0, 3, 166, 0.7)',
              color: 'var(--secondary)',
              padding: '0 3px',
              boxSizing: 'border-box',
            }}
          >
            ფუნქცია მალე დაემატება
          </mark>
          .
        </p>

        {/*<h2>Store</h2>
        <div className={classes.list}>
          {items.map((item) => (
            <Link
              key={item.id}
              className={classes.listItem}
              to={`/store/product/${item.id}`}
            >
              <StoreItem data={item} />
            </Link>
          ))}
        </div>*/}
      </div>
    </div>
  );
};

export default Store;
