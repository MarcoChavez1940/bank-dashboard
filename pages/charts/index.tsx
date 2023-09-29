'use client'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: 'My stock chart'
  },

  series: [{
    data: [[Date.UTC(2013, 5, 2), 0.7695],
    [Date.UTC(2013, 5, 3), 0.7648],
    ...
    [Date.UTC(2013, 5, 24), 0.7623],]
  }]
}

export default function Counter() {

  return (
    <div>
      <h1>hola</h1>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
}