import React, { useState, useCallback } from 'react';

import YoutubeEmbed from '../UI/YoutubeEmbed/YoutubeEmbed';

import classes from './Projects.module.css';

const Projects = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 style={{ fontFamily: 'Calligraphy' }}>proeqtebi</h1>
        <h1
          style={{
            fontFamily: 'BPGMikheilStefane, BPG Mikheil Stefane',
          }}
        >
          დაათვალიერე მუსიკა:
        </h1>
        <p>
          პროექტი „დაათვალიერე მუსიკა“ შეიქმნა ჰოლოზეუმისთვის, რომელიც
          წარმოადგენს ჰოლოგრამების მუზეუმს. ჰოლოზეუმისა და ამბავის გუნდის
          თანამშრომლობით, ამბავის მუსიკა და ვიზუალები, ადაპტირდა ჰოლოზეუმის
          სივრცეში, სადაც დამთავლიერებელს საშუალება ეძლევა დაათვალიეროს ამბავის
          ვიზუალური ხელოვნება და მოუსმინოს ამბავის მუსიკას. ჰოლოზეუმის
          განსხვავებული სივრცეები, სხვადასხვა პერსპექტივიდან ყურების საშუალებას
          იძლევა. პროექტის ფარგლებში შეიქმნა ასევე სპეციალური ინტერაქციული
          სივრცეები, სადაც დამთვალიერებელს შეუძლია თავად შეუსაბამოს სხვადასხვა
          ეფექტი ვიზუალს და ფიზიკურადაც გადავიდეს ვიზუალში. დღეისათვის
          „დაათვალიერე მუსიკა“ ჰოლოზეუმის რეპერტუარის ნაწილია. დაწვრილებით იხ.
        </p>
        <p style={{ marginBottom: '6%' }}>
          პროექტის ფარგლებში, მთავარ არხთან თანამშრომლობით გადავიღეთ სრული
          პერფორმანსი ჰოლოზეუმში.
        </p>
        <YoutubeEmbed url='https://www.youtube.com/embed/X68trwe3_uI' />
      </div>
    </div>
  );
};

export default Projects;
