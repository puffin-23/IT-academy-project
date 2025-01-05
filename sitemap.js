
const fs = require('fs');
const { Builder } = require('xmlbuilder');

// Генерация sitemap.xml
const generateSitemap = async () => {
    const contents = await Content.findAll();
    const builder = new Builder();
    let urlset = builder.create('urlset', { version: '1.0', encoding: 'UTF-8' });

    contents.forEach(content => {
        urlset.ele('url')
            .ele('loc', `http://yourwebsite.com/content/${content.id}`).up()
            .ele('changefreq', 'daily').up()
            .ele('priority', '0.5').up();
    });

    fs.writeFileSync('public/sitemap.xml', urlset.end({ pretty: true }));
};

// Вызов функции после создания/редактирования контента
router.post('/new', async (req, res) => {
    const { title, body } = req.body;
    await Content.create({ title, body });
    await generateSitemap();
    res.redirect('/admin');
});

router.post('/edit/:id', async (req, res) => {
    const { title, body } = req.body;
    await Content.update({ title, body }, { where: { id: req.params.id } });
    await generateSitemap();
    res.redirect('/admin');
});