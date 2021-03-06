import React from 'react';
import UikChart from '../../@uik/UikChart';
import '../../@uik/UikChart/chartjs.scss';
import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikInput,
  UikDivider,
  UikContentTitle
} from '../../@uik';
import { DoughnutOptions } from './DoughnutOptions';

export const QuestionChart = props => {
  const {
    id,
    title,
    amount,
    pointsEach,
    creditForEach,
    pointsExpected,
    comment,
    handleChange,
    handleCommentChange
  } = props;

  const calculatePointsEarned = (creditForEach, amount, pointsEach) => {
    return creditForEach ? amount * pointsEach : amount > 0 ? pointsEach : 0;
  };

  const pointsEarned = calculatePointsEarned(creditForEach, amount, pointsEach);

  const styles = {
    width: '300px',
    margin: '20px'
  };

  return (
    <div style={styles}>
      <UikWidget style={{ marginBottom: '10px' }}>
        <UikWidgetHeader
          style={{
            minHeight: '100px',
            paddingTop: '5px',
            paddingBottom: '5px'
          }}
        >
          {title}
          <span>
            <h5 style={{ color: '#CCC', margin: 0, padding: 0 }}>
              {pointsEach} point{pointsEach > 1 ? 's ' : ' '}
              {creditForEach ? 'each' : 'total'}
            </h5>
          </span>
        </UikWidgetHeader>
        <UikWidgetContent style={{ padding: '10px' }}>
          {/* Points Each: {pointsEach}
          Credit for Each: {creditForEach}
          Points Earned: {pointsEarned}
          Points Expected: {pointsExpected} */}
          <div style={{ display: 'flex' }}>
            <UikChart
              chartType='Doughnut'
              data={{
                datasets: [
                  {
                    data: [
                      pointsEarned,
                      pointsEarned < pointsExpected
                        ? pointsExpected - pointsEarned
                        : 0
                    ],
                    backgroundColor: ['#0D3B95', '#CCC']
                  }
                ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [`Goal: ${pointsExpected}`]
              }}
              height={175}
              width={175}
              options={DoughnutOptions}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              {creditForEach ? (
                <input
                  data-id={id}
                  size={3}
                  value={amount}
                  onChange={handleChange}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '28pt',
                    textAlign: 'center'
                  }}
                />
              ) : (
                <select
                  data-id={id}
                  value={amount}
                  onChange={handleChange}
                  style={{
                    border: '1px solid #fff',
                    backgroundColor: 'transparent'
                  }}
                >
                  <option value='0'>No</option>
                  <option value='1'>Yes</option>
                </select>
              )}
              <UikDivider />
              <h3 style={{ marginTop: '10px', marginBottom: '0px' }}>
                {pointsEarned}
              </h3>
              <UikContentTitle
                style={{
                  textAlign: 'center',
                  paddingBottom: '0px',
                  marginBottom: '0px'
                }}
              >
                Points{'\n'}Earned
              </UikContentTitle>
            </div>
          </div>
        </UikWidgetContent>
      </UikWidget>
      <UikInput
        data-comment-id={id}
        label='Comment'
        onChange={handleCommentChange}
        value={comment}
        style={{ width: '89%' }}
      />
    </div>
  );
};
