import NetInfo from '@react-native-community/netinfo';

class NetworkService {
  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();

    return state.isConnected ?? false;
  }
}

export default new NetworkService();