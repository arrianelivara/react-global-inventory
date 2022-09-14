import LocalizedStrings from "react-localization";
import en from "./en";
import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./translations.module.scss";
import classNames from "classnames";

const cleanTranslation = (translations) => {
  const newTranslation = {};
  for (const [k, translation] of Object.entries(translations)) {
    if (translation) {
      newTranslation[k] = translation;
    }
  }
  return newTranslation;
};

const lang = new LocalizedStrings(
  {
    en: cleanTranslation(en),
  },
  { logsEnabled: false }
);

export const Text = ({ text }) => {
  return text;
};

export const Translate = ({ text, items, className }) => {
  const translated = useMemo(() => {
    const sentence = text.split(" ");
    const buildSentence = [];
    sentence.forEach((word) => {
      let placeholder = false;
      items.forEach((item, key) => {
        const ph = `{${key}}`;
        if (word.toString().includes(ph)) {
          const startEnd = word.toString().split(ph);
          const start = startEnd?.[0] || "";
          const end = startEnd?.[1] || "";
          buildSentence.push(
            <>
              {start}
              {item}
              {end}{" "}
            </>
          );
          placeholder = true;
        }
      });
      if (!placeholder) {
        buildSentence.push(` ${word} `);
      }
    });
    return buildSentence;
  }, [text, items]);

  return (
    <span className={classNames(className, styles.translate)}>
      {translated.map((t) => {
        return <Text key={uuidv4()} text={t} />;
      })}
    </span>
  );
};

const translation = (translations) => {
  const langQuery = new URLSearchParams(window.location.search).get('lang');
  
  if (langQuery) {
    localStorage.setItem('locale', langQuery);
  }

  translations.setLanguage(localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en');

  const populate = (word, words) => {
    if (words.length) {
      words.forEach((text, key) => {
        word = word.replace(`{${key}}`, text);
      });
    }
    return word;
  };

  return { ...translations, populate, Translate };
};

export default translation(lang);
