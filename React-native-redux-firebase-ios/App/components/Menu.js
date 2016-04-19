/**
 * Menu Component
 */

'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { 
  Component,
  StyleSheet, 
  NavigatorIOS, 
  TabBarIOS, 
  AlertIOS,
  View 
} = React;

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'first'
    };
  }

  renderSection(route, ref) {
    return (
      <NavigatorIOS
        ref={ref}
        initialRoute={route}
        style={styles.header}
        barTintColor='#FFF'
        shadowHidden={true}
        tintColor='#ED253C'
        titleTextColor='#CE2132'        
        translucent={false}
      />
    );
  }

  render() {
    return (
      <TabBarIOS 
        selectedTab={this.state.selectedTab} 
        barTintColor='#FFFFFF'
        tintColor='#ED253C'
        translucent={false}
        style={styles.menu}>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'first'}
          title={this.props.firstRoute.title}
          iconName={this.props.firstRoute.iconName}
          selectedIconName={this.props.firstRoute.selectedIconName}
          onPress={() => {
            (this.state.selectedTab === 'first') ?
              this.refs.first.popToTop()
            :
              this.setState({
                selectedTab: 'first'
              });
          }}>
          {this.renderSection(this.props.firstRoute, 'first')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'second'}
          title={this.props.secondRoute.title}
          iconName={this.props.secondRoute.iconName}
          selectedIconName={this.props.secondRoute.selectedIconName}
          onPress={() => {
            (this.state.selectedTab === 'second') ?
              this.refs.second.popToTop()
            :
              this.setState({
                selectedTab: 'second'
              });
          }}>
          {this.renderSection(this.props.secondRoute, 'second')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'third'}
          title={this.props.thirdRoute.title}
          iconName={this.props.thirdRoute.iconName}
          selectedIconName={this.props.thirdRoute.selectedIconName}
          onPress={() => {
            (this.state.selectedTab === 'third') ?
              this.refs.third.popToTop()
            :
              this.setState({
                selectedTab: 'third'
              });
          }}>
          {this.renderSection(this.props.thirdRoute, 'third')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'fourth'}
          title={this.props.fourthRoute.title}
          iconName={this.props.fourthRoute.iconName}
          selectedIconName={this.props.fourthRoute.selectedIconName}
          iconSize={34}
          onPress={() => {
            (this.state.selectedTab === 'fourth') ?
              this.refs.fourth.popToTop()
            :
              this.setState({
                selectedTab: 'fourth'
              });
          }}>
          {this.renderSection(this.props.fourthRoute, 'fourth')}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

}

const styles = StyleSheet.create({
  menu: {
    position: 'relative',
    bottom: 0,
    right: 0,
    left: 0
  },
  header: {
    flex: 1
  }
});

export default Menu;
