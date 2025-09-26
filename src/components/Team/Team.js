import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import classes from './Team.module.css';

const Team = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [height, setHeight] = useState(document.documentElement.scrollHeight);
  useEffect(() => {
    const scrollHandler = () => {
      setOffsetY(window.pageYOffset);
    };
    const resizeHandler = () => {
      const currHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setHeight(currHeight);
    };

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    setHeight(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    );

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.linesContainerLeft}>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                (offsetY / height) * 10 - 6
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '45px',
              width: '90vw',
              marginBottom: '32px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                (offsetY / height) * 10 - 6
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '25px',
              marginBottom: '10px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                (offsetY / height) * 10 - 6
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '12px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                (offsetY / height) * 10 - 6
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '25px',
              marginBottom: '200px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '18px',
              width: '68vw',
              marginBottom: '28px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineShort)}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '30px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineShort)}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '40px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineShort)}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '12px',
              marginBottom: '100px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '60px',
              width: '68vw',
              marginBottom: '44px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineLong)}
            style={{
              transform: `rotate(${(offsetY / height) * 10 - 6}deg) translateY(${
                offsetY * 0.15
              }px)`,
              height: '18px',
              marginBottom: '10px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineLong)}
            style={{
              transform: `rotate(${
                (offsetY / height) * 8 - 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '10px',
            }}
          ></div>
          <div
            className={classNames(classes.line, classes.lineLong)}
            style={{
              transform: `rotate(${
                (offsetY / height) * 8 - 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '38px',
            }}
          ></div>
        </div>
        {/*<div className={classes.linesContainerRight}>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                -(offsetY / height) * 8 + 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '60px',
              width: '68vw',
              marginBottom: '44px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                -(offsetY / height) * 8 + 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '18px',
              marginBottom: '10px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                -(offsetY / height) * 8 + 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '10px',
            }}
          ></div>
          <div
            className={classes.line}
            style={{
              transform: `rotate(${
                -(offsetY / height) * 8 + 5
              }deg) translateY(${offsetY * 0.2}px)`,
              height: '38px',
            }}
          ></div>
        </div>*/}
        <h1 className={classes.header}>Cveni gundi</h1>
        <p>
          ამბავის კონცეფციის ნაწილია ფართო კოლაბორაცია სხვადასხვა პროფესიის,
          შესაძლებლობების და გამოცდილების მქონე ადამიანებთან. შემოქმედებითი
          ჯგუფის გარდა, ამბავის გუნდის წევრები არიან ადამიანები, რომლებიც
          მრავალი მიმართულებით მუშაობენ.
        </p>
        <h1>შემოქმედებითი ჯგუფი:</h1>
        <ul className={classes.list}>
          <li>ანრი ლომია</li>
          <li>ტორესა მოსი</li>
          <li>ნათი იდენი</li>
        </ul>
        <h1>საზოგადოებასთან ურთიერთობა და PR:</h1>
        <ul className={classes.list}>
          <li>ელენე მარგალიტაშვილი</li>
        </ul>
        <h1>ვებ უზრუნველყოფა:</h1>
        <ul className={classes.list}>
          <li>ანასტასია იოსებაძე</li>
        </ul>
        <h1>ფოტოგრაფი:</h1>
        <ul className={classes.list}>
          <li>ბექა ცირეკიძე</li>
        </ul>
        <h1>ტექნიკური და პროექციული უზრუნველყოფა:</h1>
        <ul className={classes.list}>
          <li>დავით ჯანიაშვილი</li>
        </ul>
      </div>
    </div>
  );
};

export default Team;
