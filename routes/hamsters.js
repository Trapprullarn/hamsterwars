import express from 'express'
const router = express.Router()

import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from '../database/firebase.js'


// Data hämtas från Firestore!

// Routes
// RESTful == har GET, POST, PUT och DELETE

//Get all documents
router.get('/', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let hamsters = [];

	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	});
	console.log(hamsters);

	res.send( hamsters )
})

//Get random document
router.get('/random', async(req, res) => {
	const colRef = collection(db, 'hamsters')
	let hamsters = [];
	
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
		
	});

	let randomHamster = Math.floor(Math.random()*hamsters.length)

	console.log(hamsters[randomHamster]);
	res.send( hamsters[randomHamster] )
})

//Get specific document by ID
router.get('/:id', async(req, res) => {
	let hamsterID = req.params.id

	const docRef = doc(db, 'hamsters', hamsterID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
	console.log("Document data:", docSnap.data());
	res.send(docSnap.data())
	} else {
	console.log("No such document!");
	res.sendStatus(404)
	return
	}
})

//Post document
router.post('/', async (req, res) => {
	let newHamster = {
		name: 'Fredrik',
		age: 2,
		favFood: 'Gravel',
		loves: 'Rocks',
		imgName: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Fredrik_av_Hessen.jpg/250px-Fredrik_av_Hessen.jpg',
		wins: 0,
		defeats: 0,
		games: 0,
	}
	
	const colRef = collection(db, 'hamsters')
	
	const newDocRef = await addDoc(colRef, newHamster)
	
	console.log('Lade till ett nytt document med id=', newDocRef.id)
	
	res.send({id:newDocRef.id})
})

//Put specific document with id
router.put('/:id', async (req, res) => {
	let newObject = {
		name: 'Peter IV',
		age: 1,
		favFood: 'Sand',
		loves: 'Sandstone'
	}
	
	const oldDocId = req.params.id
	
	const colRef = collection(db, 'hamsters')
	const oldDocRef = doc(colRef, oldDocId)
	
	updateDoc(oldDocRef, newObject)

	res.sendStatus(200)
})

//Delete document by ID
router.delete('/:id', (req, res) => {
	const idToRemove = req.params.id
	const colRef = collection(db, 'hamsters')
	const docRef = doc(colRef, idToRemove)
	deleteDoc(docRef)
	res.sendStatus(200)
	
})

export default router