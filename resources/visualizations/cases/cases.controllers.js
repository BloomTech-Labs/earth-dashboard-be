/*
 * The cases controller is responsible for taking the raw DB from the database and wrangling it into
 * a shape that the front-end component can use to render the visualization. This helps keep processing
 * on the server rather than the client. Implementing caching will allow us lower processing cost on the
 * server in the future. This would not be an option if data manipulation were offloaded on the client.
 */

const { queryMapData, queryDataByDate } = require("./cases.model");

const getVisualizationData = async (_req, res, next) => {
  try {
    /*
     * Represents all of the data that makes up the final state of the map
     * data = [
     *    lat: number[]
     *    lon: number[]
     *    z: number[]
     *    colorscale: string
     *    radius: number
     *    type: string
     *    zmax: number
     *    zmin: number
     *  ]
     */
    const data = [
      Object.assign(...(await queryMapData()), {
        colorscale: "Hot",
        radius: 5,
        type: "densitymapbox",
        zmax: 5,
        zmin: 0,
      }),
    ];

    const dataByDate = await queryDataByDate();

    /*
     * Represents an array of snapshots for each day
     * frames = [{
     *    name: string
     *    data: [{
     *      lat: number
     *      lon: number
     *      radius: number
     *      type: string
     *      z: number
     *    }]
     *  }]
     */
    const frames = dataByDate.map((day) => {
      return {
        name: day.date,
        data: [
          {
            lat: day.lat,
            lon: day.lon,
            radius: 10,
            type: "densitymapbox",
            z: day.z,
          },
        ],
      };
    });

    const steps = dataByDate.map((day) => {
      return {
        args: [
          [day.date],
          {
            frame: {
              duration: 300,
              redraw: false,
            },
            transition: {
              duration: 1,
              ease: "quadratic-in-out",
            },
          },
        ],
        label: day.date,
        method: "animate",
        value: day.date,
      };
    });

    // Represents the display and interactive elements of the map
    const layout = {
      height: 800,
      updatemenus: [
        {
          buttons: [
            {
              args: [
                null,
                {
                  fromcurrent: true,
                  transition: {
                    duration: 1,
                    easing: "quadratic-in-out",
                  },
                },
              ],
              label: "Play",
              method: "animate",
            },
            {
              args: [
                [null],
                {
                  frame: {
                    duration: 0,
                    redraw: false,
                  },
                  mode: "immediate",
                  transition: {
                    duration: 0,
                  },
                },
              ],
              label: "Pause",
              method: "animate",
            },
          ],
          showactive: true,
          type: "buttons",
        },
      ],
      mapbox: {
        accesstoken: process.env.CONFIRMED_CASES_MAPBOX_TOKEN,
        style: process.env.CONFIRMED_CASES_MAPBOX_STYLE,
        center: {
          lat: 38,
          lon: -100,
        },
        zoom: 3.5,
      },
      title: {
        text: "USA Covid-19 Confirmed Cases Daily Count",
      },
      sliders: [
        {
          currentvalue: {
            font: {
              size: 15,
            },
            prefix: "Date ",
            visible: true,
          },
          transition: {
            duration: 300,
            easing: "cubic-in-out",
          },
          steps,
          x: 0,
          active: 0,
        },
      ],
    };

    // Visualization component can accept this object 'as-is' to generate the map
    res.status(200).json({ data, frames, layout });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationData };
