import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export const App = () => {
  const [feeds, setFeeds] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const stateArrProps = Object.keys(feeds);
  const totalFeeds = feeds.good + feeds.neutral + feeds.bad;

  const handleBtnClick = nameValue => {
    setFeeds(prevstate => {
      const value = prevstate[nameValue];
      return { ...prevstate, [nameValue]: value + 1 };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feeds;
    if (!totalFeeds) {
      return 0;
    }
    const posPercentFeeds = Math.round((good * 100) / totalFeeds);
    return posPercentFeeds;
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={stateArrProps}
          onLeaveFeedback={handleBtnClick}
        />
      </Section>
      <Section title="Statistics">
        {totalFeeds > 0 ? (
          <Statistics
            good={feeds.good}
            neutral={feeds.neutral}
            bad={feeds.bad}
            total={totalFeeds}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
