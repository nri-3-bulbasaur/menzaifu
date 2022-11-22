import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import './ActivitiesCreate.css';
import {
  View,
  Flex,
  TextField,
  Button,
  // Table,
  // TableHead,
  // TableRow,
  // TableBody,
  // TableCell,
} from '@aws-amplify/ui-react';
import {
  listActivitiesUtil,
  createActivitiesUtil,
  // updateActivitiesUtil,
  // deleteActivitiesUtil,
} from '../utils/requestActivities';
import {
  listUsersUtil,
  updateUsersUtil,
} from '../utils/requestUsers';
import '@aws-amplify/ui-react/styles.css';

const ActivitiesCreate = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState([]);
  const [points, setPoints] = useState();

  // const history = useHistory(); // historyを用意する
  // const onClickButton = () => {
  //   history.goBack(); // 戻ることができる
  // };

  // 2.1 show ZaifuPoint on screen
  useEffect(() => {
    (async () => {
      const initPoint = await getUserPoint(userInfo.user.username);
      console.log("initPoint", initPoint);
      setPoints(initPoint);  
    })();
  }, []);

  // 1. get userId
  const userInfo = props;
  const userName = userInfo.user.username;

  // 2. get user ZaifuPoint by given userId
  const getUserPoint = async (userId) =>  {
    const userPoint = await listUsersUtil().then(
      (res) => res.find(user => user.userId === userId).zaifuPoint
    );
    setPoints(userPoint);
    return userPoint;
  };

  // 3. get user category(walking - amount) VALUE from screen
  const getAmount = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const amt = form.get('amount');
    return amt;
  };

  // 4.  calculate ZaifuPoint by give VALUE
  const calcZaifuPoint = (amount) => {
    const weight = 0.1;
    const zaifuPoint = Math.round(amount * weight);
    return zaifuPoint;
  };

  // 5. update ZaifuPoint by given userID & diff point
  const updateUserPoint = async (userId, zaifuPoint) => {
    // get user
    const user = await listUsersUtil().then(
      (res) => res.find(user => user.userId === userId)
      );
    // update user point
    user.zaifuPoint = zaifuPoint;
    // update user
    const newUsers = await updateUsersUtil(user);
    if (newUsers) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const activitiesList = await listActivitiesUtil();
      setActivities(activitiesList);
    })();
  }, []);

  const createActivity = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      userId: form.get('userId'),
      activityId: form.get('activityId'),
      amount: form.get('amount'),
    };
    const newActivities = await createActivitiesUtil(data);    
    setActivities(newActivities);
  };

  // 1. get userId
  // 2. get user ZaifuPoint by given userId
  // 2.1 show ZaifuPoint on screen
  // 3. get user category(walking - amount) VALUE from screen
  // 4.  calculate ZaifuPoint by give VALUE
  // 5. update ZaifuPoint by given userID & diff point
  // 6. calc ZaifuPoint diff (+ xxx point plused) and show on screen
  // 7. change SAVE button to BACK button 


  return (
    <>
      <div id="level1_frame">
        <h2>Zaifu &nbsp; { points } pt</h2>
        <View
          as="form"
          onSubmit={async (e) => {
            await createActivity(e);
            const amt = await getAmount(e);
            const points_after = points + calcZaifuPoint(amt);
            setPoints(points_after);
            updateUserPoint(userName, points_after);
            // onClickButton();
          }}
        >
          <Flex direction="column" alignItems="left">
            <TextField
              name="amount"
              placeholder="歩"
              label="ワォーキング"
              variation="default"
              required
            />
            <Button id="button"
              type="submit" 
              variation="primary"
              isFullWidth={true}
                  >
            保存
          </Button>
          </Flex>
        </View>
      </div>
    </>
  );
};

export default ActivitiesCreate;
