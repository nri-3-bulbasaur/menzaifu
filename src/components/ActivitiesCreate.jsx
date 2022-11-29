import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

// 1. get userId
// 2. get user ZaifuPoint by given userId
// 2.1 show ZaifuPoint on screen
// 3. get user category(walking - amount) VALUE from screen
// 4.  calculate ZaifuPoint by give VALUE
// 5. update ZaifuPoint by given userID & diff point
// 6.(PENDING) redirect to ./ by button-click

const ActivitiesCreate = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState([]);
  const [points, setPoints] = useState();

  const navigate = useNavigate()

  // 2.1 show ZaifuPoint on screen
  useEffect(() => {
    (async () => {
      const initPoint = await getUserPoint(userInfo.user.username);
      console.log("initPoint", initPoint);
      setPoints(initPoint);
      const activitiesList = await listActivitiesUtil();
      // activitiesList sorted by createdAt
      setActivities(activitiesList.sort((a, b) => {
        if(a.createdAt < b.createdAt) return -1;
        else if(a.createdAt > b.createdAt) return 1;
        return 0;
      }));
      // console.log("activitiesList", activitiesList);
    })();
  }, []);

  // 1. get userId
  const userInfo = props;
  const userName = userInfo.user.username;

  // 2. get user ZaifuPoint by given userId
  const getUserPoint = async (userId) =>  {
    const userList = await listUsersUtil();
    console.log("userList", userList);
    const userPoint = userList.find(user => user.userId === userId).zaifuPoint;
    if (userPoint) return userPoint;
    else return 0;
  };

  // 3. get user category(walking - amount) VALUE from screen
  const getAmount = async (event) => {
    // event.preventDefault();
    // const form = new FormData(event.target);
    // const amt = form.get('amount');
    // return amt;
    return event.target.form[0].value;
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

  const createActivity = async (event, userId, activityId) => {
    console.log("createActivity()");
    event.preventDefault();
    // const form = new FormData(event.target);
    console.log("event.target.form[0].value", event.target.form[0].value);
    const data = {
      userId: userId,
      activityId: activityId,
      amount: event.target.form[0].value,
      // amount: form.get('amount'),
    };
    const newActivities = await createActivitiesUtil(data);    
    setActivities(newActivities);
  };

  return (
    <>
      <div id="level1_frame">
        <h2>Zaifu &nbsp; { points } pt</h2>
        <View
          as="form"
          // onSubmit={async (e) => {
          //   console.log("------------- onSubmit (e)", e);
          //   await createActivity(e, userName, 'walking');
          //   const amt = await getAmount(e);
          //   const points_after = points + calcZaifuPoint(amt);
          //   updateUserPoint(userName, points_after);
          // }}
        >
          <Flex direction="column" alignItems="left">
            <TextField
              name="amount"
              placeholder="歩"
              label="ウォーキング"
              variation="default"
              required
            />
            {/* <Link to="/"> */}
              <Button id="button"
                type="submit" 
                variation="primary"
                isFullWidth={true}
                onClick={ async (e) => { 
                  // console.log("------------- onClick (e)", e);
                  await createActivity(e, userName, 'walking');
                  const amt = await getAmount(e);
                  const points_after = points + calcZaifuPoint(amt);
                  await updateUserPoint(userName, points_after);
                  navigate("/");
                }}    
              >
              保存
              </Button>
            {/* </Link> */}
          </Flex>
        </View>
      </div>
    </>
  );
};

export default ActivitiesCreate;
