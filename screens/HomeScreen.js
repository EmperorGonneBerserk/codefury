import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [disasterAlerts, setDisasterAlerts] = useState([]);
  const [safetyTips, setSafetyTips] = useState([]);
  const [criticalUpdates, setCriticalUpdates] = useState([]);
  const [disasterNews, setDisasterNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchDisasterAlerts(),
        fetchSafetyTips(),
        fetchCriticalUpdates(),
        fetchDisasterNews()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDisasterAlerts = async () => {
    // Replace with real API call
    const alerts = [
      { id: '1', title: 'Flood Warning', description: 'Heavy rain expected in the area.', timestamp: '10 mins ago' },
      { id: '2', title: 'Earthquake Alert', description: 'Minor tremors detected.', timestamp: '2 hours ago' },
    ];
    setDisasterAlerts(alerts);
  };

  const fetchSafetyTips = async () => {
    // Replace with real API call
    const tips = [
      { id: '1', tip: 'Keep an emergency kit with essential items.' },
      { id: '2', tip: 'Know the nearest evacuation routes.' },
    ];
    setSafetyTips(tips);
  };

  const fetchCriticalUpdates = async () => {
    // Replace with real API call
    const updates = [
      { id: '1', update: 'Shelters are available at XYZ locations.' },
      { id: '2', update: 'Emergency services are on high alert.' },
    ];
    setCriticalUpdates(updates);
  };

  const fetchDisasterNews = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/everything',
        {
          params: {
            q: 'disaster OR earthquake OR flood OR hurricane OR wildfire',
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: 'a3056361ae624fdfb591257ab6106047',
          },
        }
      );
      setDisasterNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllData().then(() => setRefreshing(false));
  }, []);

  const renderAlertItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  const renderSafetyTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <Text>{item.tip}</Text>
    </View>
  );

  const renderCriticalUpdateItem = ({ item }) => (
    <View style={styles.updateCard}>
      <Text>{item.update}</Text>
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.timestamp}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.sectionTitle}>Latest Disaster Alerts</Text>
        <FlatList
          data={disasterAlerts}
          renderItem={renderAlertItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <Text style={styles.sectionTitle}>Safety Tips</Text>
        <FlatList
          data={safetyTips}
          renderItem={renderSafetyTipItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <Text style={styles.sectionTitle}>Critical Updates</Text>
        <FlatList
          data={criticalUpdates}
          renderItem={renderCriticalUpdateItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <Text style={styles.sectionTitle}>Latest Disaster News</Text>
        <FlatList
          data={disasterNews}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 250,
    elevation: 2,
  },
  tipCard: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 250,
    elevation: 2,
  },
  updateCard: {
    backgroundColor: '#ffeb3b',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 250,
    elevation: 2,
  },
  newsCard: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 300,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timestamp: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default HomeScreen;