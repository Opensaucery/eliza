const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
//const links = require('../../Articles');

// Gets all links
//router.get('/', (req, res) => res.json(links));

// Get single link
router.get('/:id', (req, res) => {
    const found = links.some(link=> link.id === parseInt(req.params.id));

    if(found) {
        res.json(links.filter(link => link.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No link with the id of ${req.params.id}`});
    }
});

// Create Link
router.post('/', (req, res) => {
    const newLink = {
        id: uuid.v4(),
        headLine: req.body.headLine,
        descrip: req.body.descrip,
        status: 'active'
    };

    if(!newLink.headLine || !newLink.descrip) {
        return res.status(400).json({ msg: 'Please include a headline and description' });
    }

    links.push(newLink);
    //res.json(links);
    res.redirect('/edit');
});

// Update link
router.put('/:id', (req, res) => {
    const found = links.some(link=> link.id === parseInt(req.params.id));

    if(found) {
        const updLink = req.body;
        links.forEach(link => {
            if (link.id === parseInt(req.params.id)) {
                link.headLine = updLink.headLine ? updLink.headLine : link.headLine;;
                link.descrip = updLink.descrip ? updLink.descrip : link.descrip;;

                res.json({ msg: 'Link updated', link});
            }
        });
    } else {
        res.status(400).json({ msg: `No link with the id of ${req.params.id}`});
    }
});

// Delete link

router.delete('/:id', (req, res) => {
const found = links.some(link=> link.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Link deleted', links: links.filter(link => link.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No link with the id of ${req.params.id}`});
    }
});

module.exports = router;
