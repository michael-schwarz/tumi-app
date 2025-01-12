import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { firestore } from './index';
import { eventSignup } from './templates';

export const newEvent = functions
  .region('europe-west1')
  .firestore.document('events/{eventId}')
  .onCreate(async (snap, context) => {
    await firestore
      .collection('events')
      .doc(context.params['eventId'])
      .update({ usersSignedUp: 0 });
  });

export const newSignup = functions
  .region('europe-west1')
  .firestore.document('events/{eventId}/signups/{signupId}')
  .onCreate(async (snap, context) => {
    const value = snap.data();
    if (value) {
      const userSnap = await firestore
        .collection('users')
        .doc(value.id)
        .get();
      const eventSnap = await firestore.doc(snap.ref.parent.parent!.path).get();
      const user = userSnap.data();
      const event = eventSnap.data();
      if (!user) {
        throw new functions.https.HttpsError('invalid-argument', `Could not find a record for UID ${value.id}!`);
      }
      if (!event) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Could not find a record for path ${snap.ref.parent.parent!.path}!`
        );
      }
      const transporter = nodemailer.createTransport(
        {
          port: 587,
          host: 'postout.lrz.de',
          secure: false,
          auth: { user: 'tumi.tuzeio1@tum.de', pass: functions.config().email.pass }
        },
        { replyTo: 'tumi@zv.tum.de', from: 'tumi.tuzeio1@tum.de' }
      );
      await transporter.sendMail({
        subject: '[TUMi] Event Registration',
        to: user.email,
        html: eventSignup(event, user, value)
      });
      await firestore.runTransaction(async transaction => {
        const eventRef = firestore.collection('events').doc(context.params['eventId']);
        const currentData = await transaction.get(eventRef);
        if (currentData && currentData.data()) {
          transaction.update(eventRef, { usersSignedUp: currentData.data()!.usersSignedUp + value.partySize });
        }
      });
    }
  });

export const updatedSignup = functions
  .region('europe-west1')
  .firestore.document('events/{eventId}/signups/{signupId}')
  .onUpdate(async (change, context) => {
    const oldValue = change.before.data()!.partySize;
    const newValue = change.after.data()!.partySize;
    const difference = newValue - oldValue;
    if (difference !== 0) {
      await firestore.runTransaction(async transaction => {
        const eventRef = firestore.collection('events').doc(context.params['eventId']);
        const currentData = await transaction.get(eventRef);
        if (currentData && currentData.data()) {
          transaction.update(eventRef, { usersSignedUp: currentData.data()!.usersSignedUp + difference });
        }
      });
    }
  });

export const deletedSignup = functions
  .region('europe-west1')
  .firestore.document('events/{eventId}/signups/{signupId}')
  .onDelete(async (snap, context) => {
    const value = snap.data();
    if (value) {
      await firestore.runTransaction(async transaction => {
        const eventRef = firestore.collection('events').doc(context.params['eventId']);
        const currentData = await transaction.get(eventRef);
        if (currentData && currentData.data()) {
          transaction.update(eventRef, { usersSignedUp: currentData.data()!.usersSignedUp - value.partySize });
        }
      });
    }
  });

export const balanceUpdate = functions
  .region('europe-west1')
  .firestore.document('stats/money/transactions/{id}')
  .onCreate(async snap => {
    const value = snap.data();
    if (value) {
      await firestore.runTransaction(async transaction => {
        const moneyRef = firestore.collection('stats').doc('money');
        const currentBalance = await transaction.get(moneyRef);
        if (currentBalance && currentBalance.data()) {
          transaction.update(moneyRef, { balance: currentBalance.data()!.balance + value.value });
        }
      });
    }
  });
