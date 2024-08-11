import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch-news';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Fetch the latest news
    const response = await axios.get(
      'https://newsapi.org/v2/everything',
      {
        params: {
          q: 'disaster OR earthquake OR flood OR hurricane OR wildfire',
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: 'a3056361ae624fdfb591257ab6106047', // Replace with your actual API key
        },
      }
    );

    const newsData = response.data.articles;

    // Compare with the latest news stored in async storage
    const storedNews = await AsyncStorage.getItem('latestNews');
    const latestNews = newsData[0];

    if (storedNews && latestNews.title !== JSON.parse(storedNews).title) {
      // Send push notification if there's new news
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Disaster News",
          body: latestNews.title,
          data: { newsItem: latestNews },
        },
        trigger: { seconds: 1 },
      });

      // Update stored news with the latest one
      await AsyncStorage.setItem('latestNews', JSON.stringify(latestNews));
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error fetching news in background:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register the background fetch task
const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15 * 60, // 15 minutes
    stopOnTerminate: false, // whether to stop the task when the app is terminated
    startOnBoot: true, // whether to start the task when the device boots up
  });
};

const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
};

// Register background fetch task in useEffect
useEffect(() => {
  registerBackgroundFetchAsync();
  return () => unregisterBackgroundFetchAsync();
}, 
[]);