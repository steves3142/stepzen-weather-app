import { getClient } from "@/apollo-client"
import CallOutCard from "@/components/CallOutCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { Callout } from "@tremor/react";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  console.log(results)

  return (
    <div>
      {/* <Information Panel/>*/}

      <div>
        <div>
          <div>
            <h2 className="text-xl font-bold">Today's Overview</h2>
            <p className="text-sm text-gray-400">Last Updated at: {""}
            {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone}
            )
            </p>
          </div>

          <div>
            <CallOutCard 
            message="This is where GPT-4 Summary will go!"
            
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default WeatherPage