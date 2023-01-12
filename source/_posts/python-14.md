---
title:  Python Scrapy Practice(Advanced)
abbrlink: ccd2
date: 2023-01-05 09:18:23
categories: Coding
tags:
	- python
---

### 說明
#### check scrapy methoud
+ JavaScript Require?
+ check API supported - Network > Fetch/XHR
+ check pagination

<!--more-->

#### scrapy coding checklist
+ field process by items.py

### [Centris Canada](https://www.centris.ca/en)
#### get 1st page list
##### create project and spider
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice>scrapy startproject centris
New Scrapy project 'centris', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\108-scrapy-practice\centris
You can start your first spider with:
    cd centris
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice>cd centris
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\centris>scrapy genspider listing www.centris.ca/en
Created spider 'listing' using template 'basic' in module:
  centris.spiders.listing
```

##### listing.py
``` py
import scrapy
from scrapy.selector import Selector
import json
import re


class ListingSpider(scrapy.Spider):
    name = 'listing'
    allowed_domains = ['www.centris.ca']
    position = {
        "startPosition": 0
    }

    def start_requests(self):
        query = {
            "query": {
                "UseGeographyShapes": 0,
                "Filters": [
                    {
                        "MatchType": "CityDistrictAll",
                        "Text": "Montréal (All boroughs)",
                        "Id": 5
                    }
                ],
                "FieldsValues": [
                    {
                        "fieldId": "CityDistrictAll",
                        "value": 5,
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "Category",
                        "value": "Residential",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "SellingType",
                        "value": "Rent",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "LandArea",
                        "value": "SquareFeet",
                        "fieldConditionId": "IsLandArea",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 0,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 1500,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    }
                ]
            },
            "isHomePage": True
        }
        yield scrapy.Request(
            url="https://www.centris.ca/property/UpdateQuery",
            method="POST",
            body=json.dumps(query),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.update_query
        )

    def update_query(self, response):
        # print("=====================")
        # print(response.body)
        # print("=====================")
        yield scrapy.Request(
            url="https://www.centris.ca/Property/GetInscriptions",
            method="POST",
            body=json.dumps(self.position),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.parse
        )

    def parse(self, response):
        resp_dict = json.loads(response.body)
        print(type(resp_dict))
        print("=====================")
        # print(response.body)
        # print(resp_dict)
        # resp_dict['d']['Result']['html'] - same as below

        html = resp_dict.get('d').get('Result').get('html')
        sel = Selector(text=html)
        listings = sel.xpath("//div[@class='shell']")

        # print html or write to file
        # print(html)
        # print("=====================")
        # with open('index.html', 'w') as f:
        #     f.write(html)
        for listing in listings:
            category = listing.xpath("normalize-space(.//span[@class='category']/div/text())").get()
            # some room not include bed
            bedrooms = listing.xpath(".//div[@class='cac']/text()").get()
            bathrooms =  listing.xpath(".//div[@class='sdb']/text()").get()
            if bedrooms:
                features = f"{bedrooms} Bed, {bathrooms} Bath"
            else:
                features = f"{bathrooms} Bath"

            # remove character "," space and $
            price_str =  listing.xpath(".//div[@class='price']/span/text()").get()
            price = re.sub("[^0-9]", "",  price_str)
            city = listing.xpath("(.//span[@class='address']/div)[2]/text()").get()
            url = listing.xpath(".//a[@class='property-thumbnail-summary-link']/@href").get()
            yield {
                'category': category,
                'features': features,
                'price': price,
                'city': city,
                'url': response.urljoin(url)
            }
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\centris>scrapy crawl listing
......
2023-01-05 16:26:42 [scrapy.core.engine] DEBUG: Crawled (200) <POST https://www.centris.ca/Property/GetInscriptions> (referer: https://www.centris.ca/property/UpdateQuery)
2023-01-05 16:26:42 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
# 1st item
{	'category': 'Condo / Appartement à louer', 
	'features': '1 Bed, 1 Bath', 
	'price': '1350', 'city': 'Montréal (Ville-Marie)', 
	'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-ville-marie/16675303?view=Summary'}
2023-01-05 16:26:42 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
{'category': 'Condo / Appartement à louer', 'features': '1 Bed, 1 Bath', 'price': '1310', 'city': 'Montréal (LaSalle)', 'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-lasalle/10326169?view=Summary'}
2023-01-05 16:26:42 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
......
```

#### add paignation
##### listing.py
``` py
import scrapy
from scrapy.selector import Selector
import json
import re


class ListingSpider(scrapy.Spider):
    name = 'listing'
    allowed_domains = ['www.centris.ca']
    position = {
        "startPosition": 0
    }

    def start_requests(self):
        query = {
            "query": {
                "UseGeographyShapes": 0,
                "Filters": [
                    {
                        "MatchType": "CityDistrictAll",
                        "Text": "Montréal (All boroughs)",
                        "Id": 5
                    }
                ],
                "FieldsValues": [
                    {
                        "fieldId": "CityDistrictAll",
                        "value": 5,
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "Category",
                        "value": "Residential",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "SellingType",
                        "value": "Rent",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "LandArea",
                        "value": "SquareFeet",
                        "fieldConditionId": "IsLandArea",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 0,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 1500,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    }
                ]
            },
            "isHomePage": True
        }
        yield scrapy.Request(
            url="https://www.centris.ca/property/UpdateQuery",
            method="POST",
            body=json.dumps(query),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.update_query
        )

    def update_query(self, response):
        # print("=====================")
        # print(response.body)
        # print("=====================")
        yield scrapy.Request(
            url="https://www.centris.ca/Property/GetInscriptions",
            method="POST",
            body=json.dumps(self.position),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.parse
        )

    def parse(self, response):
        resp_dict = json.loads(response.body)
        # print(type(resp_dict))
        # print("=====================")
        # print(response.body)
        # print(resp_dict)
        # resp_dict['d']['Result']['html'] - same as below

        html = resp_dict.get('d').get('Result').get('html')
        sel = Selector(text=html)
        listings = sel.xpath("//div[@class='shell']")

        # print html or write to file
        # print(html)
        # print("=====================")
        # with open('index.html', 'w') as f:
        #     f.write(html)
        print(f"------------> index {self.position['startPosition']}")
        for listing in listings:
            category = listing.xpath("normalize-space(.//span[@class='category']/div/text())").get()
            # some room not include bed
            bedrooms = listing.xpath(".//div[@class='cac']/text()").get()
            bathrooms =  listing.xpath(".//div[@class='sdb']/text()").get()
            if bedrooms:
                features = f"{bedrooms} Bed, {bathrooms} Bath"
            else:
                features = f"{bathrooms} Bath"

            # price = "1&nbsp;500 $"
            # price = listing.xpath(".//div[@class='price']/span/text()").get()
            # remove character "," space and $
            price_str =  listing.xpath(".//div[@class='price']/span/text()").get()
            price = price_str[-1] + " " + re.sub("[^0-9]", "",  price_str)
            city = listing.xpath("(.//span[@class='address']/div)[2]/text()").get()
            url = listing.xpath(".//a[@class='property-thumbnail-summary-link']/@href").get()
            # print("=====================")
            # print(listing.xpath(".//div[@class='price']").get())
            # print(listing.xpath(".//div[@class='price']/span").getall())
            yield {
                'category': category,
                'features': features,
                'price': price,
                'city': city,
                'url': response.urljoin(url)
            }

        count = resp_dict.get('d').get('Result').get('count')
        increment_number = resp_dict.get('d').get('Result').get('inscNumberPerPage')

        if self.position['startPosition']+increment_number <  count:
            self.position['startPosition'] += increment_number

            yield scrapy.Request(
                url="https://www.centris.ca/Property/GetInscriptions",
                method="POST",
                body=json.dumps(self.position),
                headers={
                    'content-type': 'application/json; charset=utf-8',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                },
                callback=self.parse
            )
```

##### set utf-8 output(for json) - settings.py
``` py
# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\centris>scrapy crawl listing
......
2023-01-06 09:28:34 [scrapy.core.engine] DEBUG: Crawled (200) <POST https://www.centris.ca/Property/GetInscriptions> (referer: https://www.centris.ca/property/UpdateQuery)
------------> index 0
2023-01-06 09:28:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
# 1st item
{	'category': 'Condo / Appartement à louer', 
	'features': '2 Bed, 1 Bath', 
	'price': '$ 1330', 
	'city': 'Montréal (Ahuntsic-Cartierville)', 
	'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-ahuntsic-cartierville/14983973?view=Summary'}
2023-01-06 09:28:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
{'category': 'Condo / Appartement à louer', 'features': '1 Bed, 1 Bath', 'price': '$ 1275', 'city': 'Montréal (Rosemont/La Petite-Patrie)', 'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-rosemont-la-petite-patrie/21322348?view=Summary'}
2023-01-06 09:28:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/Property/GetInscriptions>
{'category': 'Condo / Appartement à louer', 'features': '1 Bed, 1 Bath', 'price': '$ 1500', 'city': 'Montréal (Saint-Laurent)', 'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-saint-laurent/19322513?view=Summary'}
......
{'downloader/request_bytes': 17270,
 'downloader/request_count': 24,
 'downloader/request_method_count/GET': 1,
 'downloader/request_method_count/POST': 23,
 'downloader/response_bytes': 1696842,
 'downloader/response_count': 24,
 'downloader/response_status_count/200': 23,
 'downloader/response_status_count/403': 1,
 'elapsed_time_seconds': 10.000307,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2023, 1, 6, 1, 43, 56, 271826),
 # item count
 'item_scraped_count': 426,
 'log_count/DEBUG': 457,
 'log_count/INFO': 10,
 'request_depth_max': 22,
 'response_received_count': 24,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/403': 1,
 'scheduler/dequeued': 23,
 'scheduler/dequeued/memory': 23,
 'scheduler/enqueued': 23,
 'scheduler/enqueued/memory': 23,
 'start_time': datetime.datetime(2023, 1, 6, 1, 43, 46, 271519)}
```

#### add splash for address and descript


##### settings.py
``` py
# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'centris.middlewares.CentrisSpiderMiddleware': 543,
#}
SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'centris.middlewares.CentrisDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'

SPLASH_URL = 'http://localhost:8050/'
```

##### listing.py
``` py
import scrapy
from scrapy.selector import Selector
import json
import re
# add splash
from scrapy_splash import SplashRequest
# add for splash user+password(run Aquarium)
# from w3lib.http import basic_auth_header


class ListingSpider(scrapy.Spider):
    name = 'listing'
    allowed_domains = ['www.centris.ca']

    position = {
        "startPosition": 0
    }
    index = 0

    # add splash
    # script = '''
    #     function main(splash, args)
    #         assert(splash:go(args.url))
    #         assert(splash:wait(0.5))
    #         return splash:html()
    #     end
    # '''
    # add splash - add some condition
    script = '''
        function main(splash, args)
            splash:on_request(function(request)
                if request.url:find('css') then
                    request.abort()
                end
            end)
            splash.images_enabled = false
            splash.js_enabled = false
            assert(splash:go(args.url))
            assert(splash:wait(0.5))
            return splash:html()
        end
    '''


    def start_requests(self):
        query = {
            "query": {
                "UseGeographyShapes": 0,
                "Filters": [
                    {
                        "MatchType": "CityDistrictAll",
                        "Text": "Montréal (All boroughs)",
                        "Id": 5
                    }
                ],
                "FieldsValues": [
                    {
                        "fieldId": "CityDistrictAll",
                        "value": 5,
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "Category",
                        "value": "Residential",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "SellingType",
                        "value": "Rent",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "LandArea",
                        "value": "SquareFeet",
                        "fieldConditionId": "IsLandArea",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 0,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 1500,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    }
                ]
            },
            "isHomePage": True
        }
        yield scrapy.Request(
            url="https://www.centris.ca/property/UpdateQuery",
            method="POST",
            body=json.dumps(query),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.update_query
        )

    def update_query(self, response):
        yield scrapy.Request(
            url="https://www.centris.ca/Property/GetInscriptions",
            method="POST",
            body=json.dumps(self.position),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.parse
        )

    def parse(self, response):
        resp_dict = json.loads(response.body)

        # resp_dict['d']['Result']['html'] - same as below
        html = resp_dict.get('d').get('Result').get('html')
        sel = Selector(text=html)
        listings = sel.xpath("//div[@class='shell']")

        print(f"------------> index {self.position['startPosition']}")
        for listing in listings:
            category = listing.xpath("normalize-space(.//span[@class='category']/div/text())").get()
            # some room not include bed
            bedrooms = listing.xpath(".//div[@class='cac']/text()").get()
            bathrooms =  listing.xpath(".//div[@class='sdb']/text()").get()
            if bedrooms:
                features = f"{bedrooms} Bed, {bathrooms} Bath"
            else:
                features = f"{bathrooms} Bath"

            # remove character "," space and $
            price_str =  listing.xpath(".//div[@class='price']/span/text()").get()
            price = price_str[-1] + " " + re.sub("[^0-9]", "",  price_str)
            city = listing.xpath("(.//span[@class='address']/div)[2]/text()").get()
            url = listing.xpath(".//a[@class='property-thumbnail-summary-link']/@href").get()
            abs_url = response.urljoin(url)

            self.index += 1
            # yield {
            #     'index': self.index,
            #     'category': category,
            #     'features': features,
            #     'price': price,
            #     'city': city,
            #     'url': response.urljoin(url)
            # }
            yield SplashRequest(
                url= abs_url,
                endpoint='execute',
                callback= self.parse_summary,
                args = {
                    'lua_source': self.script
                },
                meta = {
                    'cat': category,
                    'fea': features,
                    'pri': price,
                    'city': city,
                    'url': abs_url
                },
                # add for splash user+password(run Aquarium)
                # splash_headers={
                #     'Authorization': basic_auth_header('user', 'userpass')
                # }
            )

        count = resp_dict.get('d').get('Result').get('count')
        increment_number = resp_dict.get('d').get('Result').get('inscNumberPerPage')

        if self.position['startPosition']+increment_number <  count:
            self.position['startPosition'] += increment_number

            yield scrapy.Request(
                url="https://www.centris.ca/Property/GetInscriptions",
                method="POST",
                body=json.dumps(self.position),
                headers={
                    'content-type': 'application/json; charset=utf-8',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                },
                callback=self.parse
            )

    def parse_summary(self, response):
        address = response.xpath("//h2[@itemprop='address']/text()").get()
        description = response.xpath("normalize-space(//div[@itemprop='description']/text())").get()
        category = response.request.meta['cat']
        features = response.request.meta['fea']
        price = response.request.meta['pri']
        city = response.request.meta['city']
        url = response.request.meta['url']
        yield {
            'address': address,
            'description': description,
            'category': category,
            'features': features,
            'price': price,
            'city': city,
            'url': url
        }
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\centris>scrapy crawl listing
.....
2023-01-06 14:44:18 [scrapy.core.engine] DEBUG: Crawled (403) <GET https://www.centris.ca/robots.txt> (referer: None)
......
# 1st item
{	'address': '6760, boulevard Newman, app. 806, Montreal (LaSalle)', 
	'description': 'A 5 mins du metro/transport en commun,du parc &Carrefour Angrignon.Unites spacieuses (1-2 CAC)disponibles pour une occupation immediate,finitions luxueuses,comptoirs de cuisine en quartz,hauts plafonds,grandes fenetres de qualite permettant une abondance de lumiere naturelle. Casier incl.Garage dispo', 
	'category': 'Condo / Appartement a louer', '
	features': '1 Bed, 1 Bath', 
	'price': '$ 1385', 
	'city': 'Montreal (LaSalle)', 
	'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-lasalle/11685745?view=Summary'
}
2023-01-06 14:44:32 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/fr/condo-appartement~a-louer~montreal-anjou/16844951?view=Summary>
{'address': '6528, Avenue Baldwin, Montreal (Anjou)', 'description': "Appartement 4 et demi a louer situe dans le secteur d'Anjou a Montreal Tres bien localise, pres des axes routiers (40- A25 ) , des ecoles et plusieurs autres services. Disponible a partir du 1er Janvier ou fevrier 2023. Les animaux sont acceptes. Une enquete de credit sera effectuee.", 'category': 'Condo / Appartement a louer', 'features': '2 Bed, 1 Bath', 'price': '$ 1350', 'city': 'Montreal (Anjou)', 'url': 'https://www.centris.ca/fr/condo-appartement~a-louer~montreal-anjou/16844951?view=Summary'}
2023-01-06 14:44:32 [scrapy.core.engine] DEBUG: Crawled (200) <POST https://www.centris.ca/Property/GetInscriptions> (referer: https://www.centris.ca/Property/GetInscriptions)
2023-01-06 14:44:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/fr/condo-appartement~a-louer~montreal-lasalle/15636601?view=Summary>
......
{'downloader/request_bytes': 617314,
 'downloader/request_count': 450,
 'downloader/request_method_count/GET': 1,
 'downloader/request_method_count/POST': 449,
 'downloader/response_bytes': 133403913,
 'downloader/response_count': 450,
 'downloader/response_status_count/200': 449,
 'downloader/response_status_count/403': 1,
 'elapsed_time_seconds': 206.48085,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2023, 1, 6, 6, 47, 43, 614184),
  # item count
 'item_scraped_count': 426,
 'log_count/DEBUG': 883,
 'log_count/INFO': 13,
 'log_count/WARNING': 3,
 'request_depth_max': 23,
 'response_received_count': 450,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 # robots.txt
 'robotstxt/response_status_count/403': 1,
 'scheduler/dequeued': 875,
 'scheduler/dequeued/memory': 875,
 'scheduler/enqueued': 875,
 'scheduler/enqueued/memory': 875,
 'splash/execute/request_count': 426,
 'splash/execute/response_count/200': 426,
 'start_time': datetime.datetime(2023, 1, 6, 6, 44, 17, 133334)}
2023-01-06 14:47:43 [scrapy.core.engine] INFO: Spider closed (finished)
```

#### run Aquarium

##### install Aquarium
``` bash
(myenv10_scrapy) D:\work\run\python_crawler>pip install cookiecutter

(myenv10_scrapy) D:\app\python_env\myenv10_scrapy>cookiecutter gh:TeamHG-Memex/aquarium
You've downloaded C:\Users\robertkao\.cookiecutters\aquarium before. Is it okay to delete and re-download it? [yes]: yes
folder_name [aquarium]:
num_splashes [3]:
splash_version [3.0]: latest
auth_user [user]:
auth_password [userpass]:
splash_verbosity [1]:
max_timeout [3600]:
maxrss_mb [3000]:
splash_slots [5]:
stats_enabled [1]:
stats_auth [admin:adminpass]:
tor [1]: 0
```

##### run Aquarium (need stop all splash)
``` bash
(myenv10_scrapy) D:\app\python_env\myenv10_scrapy>cd aquarium
(myenv10_scrapy) D:\app\python_env\myenv10_scrapy\aquarium>docker-compose up
```

##### 2nd time run Aquarium

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

##### test by GUI(splash)
user:userpass

<div style="max-width:400px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>

##### test by GUI(General process information)
admin:adminpass
<div style="max-width:400px">
	{% asset_img pic4.png pic4 %}
</div>

<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>

##### listing.py
``` py
import scrapy
from scrapy.selector import Selector
import json
import re
# add splash
from scrapy_splash import SplashRequest
# add for splash user+password(run Aquarium)
from w3lib.http import basic_auth_header


class ListingSpider(scrapy.Spider):
    name = 'listing'
    allowed_domains = ['www.centris.ca']

    position = {
        "startPosition": 0
    }
    index = 0

    # add splash
    # script = '''
    #     function main(splash, args)
    #         assert(splash:go(args.url))
    #         assert(splash:wait(0.5))
    #         return splash:html()
    #     end
    # '''
    # add splash - add some condition
    script = '''
        function main(splash, args)
            splash:on_request(function(request)
                if request.url:find('css') then
                    request.abort()
                end
            end)
            splash.images_enabled = false
            splash.js_enabled = false
            assert(splash:go(args.url))
            assert(splash:wait(0.5))
            return splash:html()
        end
    '''


    def start_requests(self):
        query = {
            "query": {
                "UseGeographyShapes": 0,
                "Filters": [
                    {
                        "MatchType": "CityDistrictAll",
                        "Text": "Montréal (All boroughs)",
                        "Id": 5
                    }
                ],
                "FieldsValues": [
                    {
                        "fieldId": "CityDistrictAll",
                        "value": 5,
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "Category",
                        "value": "Residential",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "SellingType",
                        "value": "Rent",
                        "fieldConditionId": "",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "LandArea",
                        "value": "SquareFeet",
                        "fieldConditionId": "IsLandArea",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 0,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    },
                    {
                        "fieldId": "RentPrice",
                        "value": 1500,
                        "fieldConditionId": "ForRent",
                        "valueConditionId": ""
                    }
                ]
            },
            "isHomePage": True
        }
        yield scrapy.Request(
            url="https://www.centris.ca/property/UpdateQuery",
            method="POST",
            body=json.dumps(query),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.update_query
        )

    def update_query(self, response):
        yield scrapy.Request(
            url="https://www.centris.ca/Property/GetInscriptions",
            method="POST",
            body=json.dumps(self.position),
            headers={
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            },
            callback=self.parse
        )

    def parse(self, response):
        resp_dict = json.loads(response.body)

        # resp_dict['d']['Result']['html'] - same as below
        html = resp_dict.get('d').get('Result').get('html')
        sel = Selector(text=html)
        listings = sel.xpath("//div[@class='shell']")

        print(f"------------> index {self.position['startPosition']}")
        for listing in listings:
            category = listing.xpath("normalize-space(.//span[@class='category']/div/text())").get()
            # some room not include bed
            bedrooms = listing.xpath(".//div[@class='cac']/text()").get()
            bathrooms =  listing.xpath(".//div[@class='sdb']/text()").get()
            if bedrooms:
                features = f"{bedrooms} Bed, {bathrooms} Bath"
            else:
                features = f"{bathrooms} Bath"

            # remove character "," space and $
            price_str =  listing.xpath(".//div[@class='price']/span/text()").get()
            price = price_str[-1] + " " + re.sub("[^0-9]", "",  price_str)
            city = listing.xpath("(.//span[@class='address']/div)[2]/text()").get()
            url = listing.xpath(".//a[@class='property-thumbnail-summary-link']/@href").get()
            abs_url = response.urljoin(url)

            self.index += 1
            # yield {
            #     'index': self.index,
            #     'category': category,
            #     'features': features,
            #     'price': price,
            #     'city': city,
            #     'url': response.urljoin(url)
            # }
            yield SplashRequest(
                url= abs_url,
                endpoint='execute',
                callback= self.parse_summary,
                args = {
                    'lua_source': self.script
                },
                meta = {
                    'cat': category,
                    'fea': features,
                    'pri': price,
                    'city': city,
                    'url': abs_url
                },
                # add for splash user+password(run Aquarium)
                splash_headers={
                    'Authorization': basic_auth_header('user', 'userpass')
                }
            )

        count = resp_dict.get('d').get('Result').get('count')
        increment_number = resp_dict.get('d').get('Result').get('inscNumberPerPage')

        if self.position['startPosition']+increment_number <  count:
            self.position['startPosition'] += increment_number

            yield scrapy.Request(
                url="https://www.centris.ca/Property/GetInscriptions",
                method="POST",
                body=json.dumps(self.position),
                headers={
                    'content-type': 'application/json; charset=utf-8',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                },
                callback=self.parse
            )

    def parse_summary(self, response):
        address = response.xpath("//h2[@itemprop='address']/text()").get()
        description = response.xpath("normalize-space(//div[@itemprop='description']/text())").get()
        category = response.request.meta['cat']
        features = response.request.meta['fea']
        price = response.request.meta['pri']
        city = response.request.meta['city']
        url = response.request.meta['url']
        yield {
            'address': address,
            'description': description,
            'category': category,
            'features': features,
            'price': price,
            'city': city,
            'url': url
        }
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\centris>scrapy crawl listing
......
2023-01-06 16:48:12 [scrapy.core.engine] DEBUG: Crawled (403) <GET https://www.centris.ca/robots.txt> (referer: None)
......
# 1st item
{	'address': '1406, Rue Sainte-Élisabeth, app. 405, Montréal (Ville-Marie), Quartier Centre', 
	'description': "ELI CONDOS - Centre-ville, nouveau condo/studio près de Quartier des Spectacles et à quelques pas des stations de métro Berri-UQAM, Saint Laurent et Place des Arts. À côté de l'hôpital CHUM et université UQAM. Vieux-Port et quartier chinois à distance de marche. Studio aire ouverte avec un nouveau lit escamotable, sofa, finition moderne, grandes fenêtres, lumineux. À proximité de tous les services, universités, transports en commun, restaurants, bars, magasins et etc.", 
	'category': 'Condo à louer',
	'features': '1 Bed, 1 Bath', 
	'price': '$ 1450', 
	'city': 'Montréal (Ville-Marie)', 
	'url': 'https://www.centris.ca/fr/condo~a-vendre~montreal-ville-marie/21291499?view=Summary'
}
2023-01-06 16:48:15 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.centris.ca/fr/condo-appartement~a-louer~montreal-ville-marie/16592244?view=Summary via http://localhost:8050/execute> (referer: None)
2023-01-06 16:48:16 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.centris.ca/fr/loft-studio~a-louer~montreal-montreal-nord/24620310?view=Summary>
{'address': '3311, boulevard Gouin Est, app. C, Montréal (Montréal-Nord)', 'description': "RÉSIDENCE DESTINÉE AUX 55 ANS ET +. Appartement 4 1/2 confortable et sécuritaire. Chauffage, électricité, câble, téléphone, poêle, frigo compris dans le prix du loyer. Les Résidences du Confort sont situées le long de la Rivière-des-Prairies à Montréal-Nord. Nombreux services offerts et activités variées et divertissantes. Vous pouvez profiter de votre mode de vie autonome ou bénéficier d'une assistance en plus d'être en sécurité 24/24. Éligible au crédit d'impôt pour maintien à domicile. Plusieurs modèles d'unités disponibles. VISITE sur rendez-vous avec moi du lundi au vendredi de 9h à 17h. Contactez- moi.", 'category': 'Loft / Studio à louer', 'features': '2 Bed, 1 Bath', 'price': '$ 1401', 'city': 'Montréal (Montréal-Nord)', 'url': 'https://www.centris.ca/fr/loft-studio~a-louer~montreal-montreal-nord/24620310?view=Summary'}
......
{'downloader/request_bytes': 634600,
 'downloader/request_count': 450,
 'downloader/request_method_count/GET': 1,
 'downloader/request_method_count/POST': 449,
 'downloader/response_bytes': 23763564,
 'downloader/response_count': 450,
 'downloader/response_status_count/200': 449,
 'downloader/response_status_count/403': 1,
 'elapsed_time_seconds': 266.406545,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2023, 1, 6, 8, 52, 38, 10140),
 'httpcompression/response_bytes': 131658461,
 'httpcompression/response_count': 426,
 # item
 'item_scraped_count': 426,
 'log_count/DEBUG': 883,
 'log_count/INFO': 14,
 'log_count/WARNING': 2,
 'request_depth_max': 23,
 'response_received_count': 450,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/403': 1,
 'scheduler/dequeued': 875,
 'scheduler/dequeued/memory': 875,
 'scheduler/enqueued': 875,
 'scheduler/enqueued/memory': 875,
 'splash/execute/request_count': 426,
 'splash/execute/response_count/200': 426,
 'start_time': datetime.datetime(2023, 1, 6, 8, 48, 11, 603595)}
```

### [Steam Store](https://store.steampowered.com/search/?filter=topsellers)
#### get best selling games
##### create project and spider
``` bash
myenv10_scrapy) D:\work\git\python_crawler\108-scrapy-practice>scrapy startproject steam
New Scrapy project 'steam', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\git\python_crawler\108-scrapy-practice\steam
You can start your first spider with:
    cd steam
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\git\python_crawler\108-scrapy-practice>cd steam
(myenv10_scrapy) D:\work\git\python_crawler\108-scrapy-practice\steam>scrapy genspider best_selling https://store.steampowered.com/search/?filter=topsellers
Created spider 'best_selling' using template 'basic' in module:
  steam.spiders.best_selling
``` 

##### scrapy shell test 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapy shell https://store.steampowered.com/search/?filter=topsellers
......
In [1]: games = response.xpath("//div[@id='search_resultsRows']/a")
In [2]: games
Out[2]:
[<Selector xpath="//div[@id='search_resultsRows']/a" data='<a href="https://store.steampowered.c...'>,
......
 <Selector xpath="//div[@id='search_resultsRows']/a" data='<a href="https://store.steampowered.c...'>,
 <Selector xpath="//div[@id='search_resultsRows']/a" data='<a href="https://store.steampowered.c...'>,
 <Selector xpath="//div[@id='search_resultsRows']/a" data='<a href="https://store.steampowered.c...'>]

In [3]: for game in games:
   ...:     url = game.xpath(".//@href").get()
   ...:     print(url)
   ...:
https://store.steampowered.com/app/1172470/Apex_Legends/?snr=1_7_7_7000_150_1
https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_7_7_7000_150_1
https://store.steampowered.com/app/1938090/Call_of_Duty_Modern_Warfare_II/?snr=1_7_7_7000_150_1
https://store.steampowered.com/app/230410/Warframe/?snr=1_7_7_7000_150_1
......
https://store.steampowered.com/app/1049590/Eternal_Return/?snr=1_7_7_7000_150_1
https://store.steampowered.com/app/1599660/Sackboy_A_Big_Adventure/?snr=1_7_7_7000_150_1
https://store.steampowered.com/app/1680880/Forspoken/?snr=1_7_7_7000_150_1

In [5]: games[5].xpath(".//div[@class='col search_capsule']/img/@src").get()
Out[5]: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1377580/capsule_sm_120.jpg?t=1672884608'

In [8]: games[5].xpath(".//div[@class='col search_released responsive_secondrow']/text()").get()
Out[8]: '12 May, 2021'
```

##### experiment.py - for test 
``` py
classes = [
    'platform_img win',
    'platform_img mac',
    'platform_img linux',
    'vr_supported'
]

def get_platforms(list_classes):
    platforms = []
    for item in list_classes:
        platform = item.split(' ')[-1]
        if platform == 'win':
            platforms.append('Windows')
        if platform == 'mac':
            platforms.append('Mac os')
        if platform == 'linux':
            platforms.append('Linux')
        if platform == 'vr_supported':
            platforms.append('VR supported')
    return platforms

print(get_platforms(classes))
```

``` bash
PS D:\work\run\python_crawler\108-scrapy-practice\steam\steam> python .\experiment.py
['Windows', 'Mac os', 'Linux', 'VR supported']
```

##### items.py
``` py
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SteamItem(scrapy.Item):
    game_url = scrapy.Field()
    img_url = scrapy.Field()
    game_name = scrapy.Field()
    release_date = scrapy.Field()
    platforms = scrapy.Field()
    reviews_summary = scrapy.Field()
    original_price = scrapy.Field()
    discounted_price = scrapy.Field()
    discount_rate = scrapy.Field()
```

##### best_selling.py
``` py
import scrapy
from ..items import SteamItem
from w3lib.html import remove_tags


class BestSellingSpider(scrapy.Spider):
    name = 'best_selling'
    allowed_domains = ['store.steampowered.com']
    start_urls = ['https://store.steampowered.com/search/?filter=topsellers']

    def get_platforms(self, list_classes):
        platforms = []
        for item in list_classes:
            platform = item.split(' ')[-1]
            if platform == 'win':
                platforms.append('Windows')
            if platform == 'mac':
                platforms.append('Mac os')
            if platform == 'linux':
                platforms.append('Linux')
            if platform == 'vr_supported':
                platforms.append('VR supported')
        return platforms

    def remove_html(self, review_summary):
        cleaned_review_summary = ''
        try:
            cleaned_review_summary = remove_tags(review_summary)
        except TypeError:
            cleaned_review_summary = 'No reviews'
        return cleaned_review_summary

    def clean_discount_rate(self, discount_rate):
        if discount_rate:
            return discount_rate.lstrip('-')
        return discount_rate

    def get_original_price(self, selector_obj):
        original_price = ''
        div_with_discount = selector_obj.xpath(".//div[contains(@class, 'discounted')]")
        if div_with_discount:
            original_price = selector_obj.xpath(".//span/strike/text()").get()
        else:
            original_price = selector_obj.xpath("normalize-space(.//div[contains(@class, 'search_price')]/text())").get()
        return original_price

    def clean_discounted_price(self, discounted_price):
        if discounted_price:
            return discounted_price.strip()
        return discounted_price

    def parse(self, response):
        steam_item = SteamItem()
        games = response.xpath("//div[@id='search_resultsRows']/a")
        for game in games:
            steam_item['game_url'] = game.xpath(".//@href").get()
            steam_item['img_url'] = game.xpath(".//div[@class='col search_capsule']/img/@src").get()
            steam_item['game_name'] = game.xpath(".//span[@class='title']/text()").get()
            steam_item['release_date'] = game.xpath(".//div[@class='col search_released responsive_secondrow']/text()").get()
            steam_item['platforms'] = self.get_platforms(game.xpath(".//span[contains(@class,'platform_img') or @class='VR Supported']/@class").getall())
            steam_item['reviews_summary'] = self.remove_html(game.xpath(".//span[contains(@class,'search_review_summary')]/@data-tooltip-html").get())
            steam_item['discount_rate'] = self.clean_discount_rate(game.xpath(".//div[contains(@class,'search_discount')]/span/text()").get())
            steam_item['original_price'] = self.get_original_price(game.xpath(".//div[contains(@class,'search_price_discount_combined')]"))
            steam_item['discounted_price'] = self.clean_discounted_price(game.xpath("(.//div[contains(@class, 'search_price discounted')]/text())[2]").get())
            yield steam_item
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapy crawl best_selling
......
{'discount_rate': None,
 'discounted_price': None,
 'game_name': 'Apex Legends™',
 'game_url': 'https://store.steampowered.com/app/1172470/Apex_Legends/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_sm_120.jpg?t=1670431796',
 'original_price': 'Free to Play',
 'platforms': ['Windows'],
 'release_date': '4 Nov, 2020',
 'reviews_summary': 'Very Positive84% of the 565,774 user reviews for this '
                    'game are positive.'}
2023-01-09 14:47:15 [scrapy.core.scraper] DEBUG: Scraped from <200 https://store.steampowered.com/search/?filter=topsellers>
{'discount_rate': None,
 'discounted_price': None,
 'game_name': 'Counter-Strike: Global Offensive',
 'game_url': 'https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_sm_120.jpg?t=1668125812',
 'original_price': 'Free to Play',
 'platforms': ['Windows', 'Mac os', 'Linux'],
 'release_date': '21 Aug, 2012',
 'reviews_summary': 'Very Positive88% of the 6,853,032 user reviews for this '
                    'game are positive.'}
......
{'downloader/request_bytes': 479,
 'downloader/request_count': 2,
 'downloader/request_method_count/GET': 2,
 'downloader/response_bytes': 44770,
 'downloader/response_count': 2,
 'downloader/response_status_count/200': 2,
 'elapsed_time_seconds': 0.64364,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2023, 1, 9, 6, 47, 15, 164996),
 'httpcompression/response_bytes': 712081,
 'httpcompression/response_count': 1,
 # item count
 'item_scraped_count': 50,
 'log_count/DEBUG': 60,
 'log_count/INFO': 10,
 'response_received_count': 2,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/200': 1,
 'scheduler/dequeued': 1,
 'scheduler/dequeued/memory': 1,
 'scheduler/enqueued': 1,
 'scheduler/enqueued/memory': 1,
 'start_time': datetime.datetime(2023, 1, 9, 6, 47, 14, 521356)}
2023-01-09 14:47:15 [scrapy.core.engine] INFO: Spider closed (finished)
```

#### pagination
##### items.py
``` py
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SteamItem(scrapy.Item):
    index = scrapy.Field()
    game_url = scrapy.Field()
    img_url = scrapy.Field()
    game_name = scrapy.Field()
    release_date = scrapy.Field()
    platforms = scrapy.Field()
    reviews_summary = scrapy.Field()
    original_price = scrapy.Field()
    discounted_price = scrapy.Field()
    discount_rate = scrapy.Field()
```

##### more_best.py
``` py
import scrapy
from scrapy.selector import Selector
import json
from ..items import SteamItem
from w3lib.html import remove_tags


class MoreBestSpider(scrapy.Spider):
    name = 'more_best'
    allowed_domains = ['store.steampowered.com']
    offset_index = 0
    INCREASEMENT_COUNT = 50
    ITEM_MAX = 230
    # print game_name + release_date
    item_index = 1

    def start_requests(self):
        page_condition = f"query&start={self.offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
        url = f"https://store.steampowered.com/search/results/?{page_condition}"

        yield scrapy.Request(
            url = url,
            method = "GET",
            callback=self.update_query
        )

    def get_platforms(self, list_classes):
        platforms = []
        for item in list_classes:
            platform = item.split(' ')[-1]
            if platform == 'win':
                platforms.append('Windows')
            if platform == 'mac':
                platforms.append('Mac os')
            if platform == 'linux':
                platforms.append('Linux')
            if platform == 'vr_supported':
                platforms.append('VR supported')
        return platforms

    def remove_html(self, review_summary):
        cleaned_review_summary = ''
        try:
            cleaned_review_summary = remove_tags(review_summary)
        except TypeError:
            cleaned_review_summary = 'No reviews'
        return cleaned_review_summary

    def clean_discount_rate(self, discount_rate):
        if discount_rate:
            return discount_rate.lstrip('-')
        return discount_rate

    def get_original_price(self, selector_obj):
        original_price = ''
        div_with_discount = selector_obj.xpath(".//div[contains(@class, 'discounted')]")
        if div_with_discount:
            original_price = selector_obj.xpath(".//span/strike/text()").get()
        else:
            original_price = selector_obj.xpath("normalize-space(.//div[contains(@class, 'search_price')]/text())").get()
        return original_price

    def clean_discounted_price(self, discounted_price):
        if discounted_price:
            return discounted_price.strip()
        return discounted_price

    def update_query(self, response):
        steam_item = SteamItem()

        resp_dict = json.loads(response.body)
        html = resp_dict['results_html']
        start_index = resp_dict['start']
        print("==================")
        print(f"start={start_index}, total_count={resp_dict['total_count']} ")
        # print(html)
        # print("==================")
        # with open('index.html', 'w', encoding='utf-8') as f:
        #     f.write(html)

        sel = Selector(text=html)
        games = sel.xpath("//a")
        for game in games:
            steam_item['game_url'] = game.xpath(".//@href").get()
            steam_item['img_url'] = game.xpath(".//div[@class='col search_capsule']/img/@src").get()
            steam_item['game_name'] = game.xpath(".//span[@class='title']/text()").get()
            steam_item['release_date'] = game.xpath(".//div[@class='col search_released responsive_secondrow']/text()").get()
            steam_item['platforms'] = self.get_platforms(game.xpath(".//span[contains(@class,'platform_img') or @class='VR Supported']/@class").getall())
            steam_item['reviews_summary'] = self.remove_html(game.xpath(".//span[contains(@class,'search_review_summary')]/@data-tooltip-html").get())
            steam_item['discount_rate'] = self.clean_discount_rate(game.xpath(".//div[contains(@class,'search_discount')]/span/text()").get())
            steam_item['original_price'] = self.get_original_price(game.xpath(".//div[contains(@class,'search_price_discount_combined')]"))
            steam_item['discounted_price'] = self.clean_discounted_price(game.xpath("(.//div[contains(@class, 'search_price discounted')]/text())[2]").get())
            steam_item['index'] = self.item_index

            # print game_name + release_date
            # print(f"({self.item_index}) : {steam_item['game_name']} -  {steam_item['release_date']}")
            self.item_index += 1

            # output
            yield steam_item

        if (start_index + self.INCREASEMENT_COUNT) < self.ITEM_MAX:
            offset_index = start_index + self.INCREASEMENT_COUNT
            print("2 ==================")
            print(f"next offset_index={offset_index}")

            page_condition = f"query&start={offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
            url = f"https://store.steampowered.com/search/results/?{page_condition}"
            yield scrapy.Request(
                url = url,
                method = "GET",
                callback=self.update_query
            )
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapy crawl more_best
......
==================
start=0, total_count=2401
2023-01-10 09:03:54 [scrapy.core.scraper] DEBUG: Scraped from <200 https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1>
{'discount_rate': None,
 'discounted_price': None,
 'game_name': 'Apex Legends™',
 'game_url': 'https://store.steampowered.com/app/1172470/Apex_Legends/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_sm_120.jpg?t=1670431796',
 'index': 1,
 'original_price': 'Free to Play',
 'platforms': ['Windows'],
 'release_date': '4 Nov, 2020',
 'reviews_summary': 'Very Positive84% of the 566,306 user reviews for this '
                    'game are positive.'}
2023-01-10 09:03:54 [scrapy.core.scraper] DEBUG: Scraped from <200 https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1>
{'discount_rate': None,
 'discounted_price': None,
 'game_name': 'Counter-Strike: Global Offensive',
 'game_url': 'https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_sm_120.jpg?t=1668125812',
 'index': 2,
 'original_price': 'Free to Play',
 'platforms': ['Windows', 'Mac os', 'Linux'],
 'release_date': '21 Aug, 2012',
 'reviews_summary': 'Very Positive88% of the 6,854,744 user reviews for this '
                    'game are positive.'}
......
{'downloader/request_bytes': 3227,
 'downloader/request_count': 6,
 'downloader/request_method_count/GET': 6,
 'downloader/response_bytes': 43572,
 'downloader/response_count': 6,
 'downloader/response_status_count/200': 6,
 'elapsed_time_seconds': 2.884105,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2023, 1, 10, 1, 3, 56, 263832),
 'httpcompression/response_bytes': 605551,
 'httpcompression/response_count': 5,
# items count
 'item_scraped_count': 250,
 'log_count/DEBUG': 264,
 'log_count/INFO': 10,
 'request_depth_max': 4,
 'response_received_count': 6,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/200': 1,
 'scheduler/dequeued': 5,
 'scheduler/dequeued/memory': 5,
 'scheduler/enqueued': 5,
 'scheduler/enqueued/memory': 5,
 'start_time': datetime.datetime(2023, 1, 10, 1, 3, 53, 379727)}
2023-01-10 09:03:56 [scrapy.core.engine] INFO: Spider closed (finished)
```

#### change to ItemLoader
##### more_best.py
``` py
import scrapy
from scrapy.selector import Selector
# add Itemloader
from scrapy.loader import ItemLoader
import json
from ..items import SteamItem
from w3lib.html import remove_tags


class MoreBestSpider(scrapy.Spider):
    name = 'more_best'
    allowed_domains = ['store.steampowered.com']
    offset_index = 0
    INCREASEMENT_COUNT = 50
    ITEM_MAX = 230
    # print game_name + release_date
    item_index = 1

    def start_requests(self):
        page_condition = f"query&start={self.offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
        url = f"https://store.steampowered.com/search/results/?{page_condition}"

        yield scrapy.Request(
            url = url,
            method = "GET",
            callback=self.update_query
        )

    def get_platforms(self, list_classes):
        platforms = []
        for item in list_classes:
            platform = item.split(' ')[-1]
            if platform == 'win':
                platforms.append('Windows')
            if platform == 'mac':
                platforms.append('Mac os')
            if platform == 'linux':
                platforms.append('Linux')
            if platform == 'vr_supported':
                platforms.append('VR supported')
        return platforms

    def remove_html(self, review_summary):
        cleaned_review_summary = ''
        try:
            cleaned_review_summary = remove_tags(review_summary)
        except TypeError:
            cleaned_review_summary = 'No reviews'
        return cleaned_review_summary

    def clean_discount_rate(self, discount_rate):
        if discount_rate:
            return discount_rate.lstrip('-')
        return discount_rate

    def get_original_price(self, selector_obj):
        original_price = ''
        div_with_discount = selector_obj.xpath(".//div[contains(@class, 'discounted')]")
        if div_with_discount:
            original_price = selector_obj.xpath(".//span/strike/text()").get()
        else:
            original_price = selector_obj.xpath("normalize-space(.//div[contains(@class, 'search_price')]/text())").get()
        return original_price

    def clean_discounted_price(self, discounted_price):
        if discounted_price:
            return discounted_price.strip()
        return discounted_price

    def update_query(self, response):
        steam_item = SteamItem()

        resp_dict = json.loads(response.body)
        html = resp_dict['results_html']
        start_index = resp_dict['start']
        print("==================")
        print(f"start={start_index}, total_count={resp_dict['total_count']} ")
        # print(html)
        # print("==================")
        # with open('index.html', 'w', encoding='utf-8') as f:
        #     f.write(html)

        sel = Selector(text=html)
        games = sel.xpath("//a")
        for game in games:
            # add Itemloader
            loader = ItemLoader(item=SteamItem(), selector=game, response=response)
            # loader.add_css()
            # loader.add_value()
            loader.add_xpath('game_url', ".//@href")
            loader.add_xpath('img_url', ".//div[@class='col search_capsule']/img/@src")
            loader.add_xpath('game_name', ".//span[@class='title']/text()")
            loader.add_xpath('release_date', ".//div[@class='col search_released responsive_secondrow']/text()")
            loader.add_xpath('platforms', ".//span[contains(@class,'platform_img') or @class='VR Supported']/@class")
            loader.add_xpath('reviews_summary', ".//span[contains(@class,'search_review_summary')]/@data-tooltip-html")
            loader.add_xpath('discount_rate', ".//div[contains(@class,'search_discount')]/span/text()")
            loader.add_xpath('original_price', ".//div[contains(@class,'search_price_discount_combined')]")
            loader.add_xpath('discounted_price', "(.//div[contains(@class, 'search_price discounted')]/text())[2]")
            loader.add_value('index', self.item_index)
            self.item_index += 1

            # add Itemloader
            # output
            yield loader.load_item()

        if (start_index + self.INCREASEMENT_COUNT) < self.ITEM_MAX:
            offset_index = start_index + self.INCREASEMENT_COUNT
            print("2 ==================")
            print(f"next offset_index={offset_index}")

            page_condition = f"query&start={offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
            url = f"https://store.steampowered.com/search/results/?{page_condition}"
            yield scrapy.Request(
                url = url,
                method = "GET",
                callback=self.update_query
            )
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapy crawl more_best
......
==================
start=0, total_count=2396
2023-01-10 10:41:30 [scrapy.core.scraper] DEBUG: Scraped from <200 https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1>
{'game_name': ['Apex Legends™'],
 'game_url': ['https://store.steampowered.com/app/1172470/Apex_Legends/?snr=1_7_7_7000_150_1'],
 'img_url': ['https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_sm_120.jpg?t=1670431796'],
 'index': [1],
 'original_price': ['<div class="col search_price_discount_combined '
                    'responsive_secondrow" data-price-final="0">\r\n'
                    '                    <div class="col search_discount '
                    'responsive_secondrow">\r\n'
                    '                        \r\n'
                    '                    </div>\r\n'
                    '                    <div class="col search_price  '
                    'responsive_secondrow">\r\n'
                    '                        Free to Play                    '
                    '</div>\r\n'
                    '                </div>'],
 'platforms': ['platform_img win'],
 'release_date': ['4 Nov, 2020'],
 'reviews_summary': ['Very Positive<br>84% of the 566,351 user reviews for '
                     'this game are positive.']}
2023-01-10 10:41:30 [scrapy.core.scraper] DEBUG: Scraped from <200 https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1>
{'game_name': ['Counter-Strike: Global Offensive'],
 'game_url': ['https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_7_7_7000_150_1'],
 'img_url': ['https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_sm_120.jpg?t=1668125812'],
 'index': [2],
 'original_price': ['<div class="col search_price_discount_combined '
                    'responsive_secondrow" data-price-final="42800">\r\n'
                    '                    <div class="col search_discount '
                    'responsive_secondrow">\r\n'
                    '                        \r\n'
                    '                    </div>\r\n'
                    '                    <div class="col search_price  '
                    'responsive_secondrow">\r\n'
                    '                        Free to Play                    '
                    '</div>\r\n'
                    '                </div>'],
 'platforms': ['platform_img win', 'platform_img mac', 'platform_img linux'],
 'release_date': ['21 Aug, 2012'],
 'reviews_summary': ['Very Positive<br>88% of the 6,854,852 user reviews for '
                     'this game are positive.']}
......
```

####  items.py data process 
#####  items.py
``` py
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
# change to string(list 1st), input Map
from scrapy.loader.processors import TakeFirst, MapCompose, Join
from scrapy.selector import Selector
from w3lib.html import remove_tags

def remove_html(review_summary):
    cleaned_review_summary = ''
    try:
        cleaned_review_summary = remove_tags(review_summary)
    except TypeError:
        cleaned_review_summary = 'No reviews'
    return cleaned_review_summary

def get_platforms(one_class):
    platforms = []
    platform = one_class.split(' ')[-1]
    if platform == 'win':
        platforms.append('Windows')
    if platform == 'mac':
        platforms.append('Mac os')
    if platform == 'linux':
        platforms.append('Linux')
    if platform == 'vr_supported':
        platforms.append('VR supported')
    return platforms

def get_original_price(html_markup):
    original_price = ''
    selector_obj = Selector(text=html_markup)
    div_with_discount = selector_obj.xpath(".//div[contains(@class, 'discounted')]")
    if div_with_discount:
        original_price = selector_obj.xpath(".//span/strike/text()").get()
    else:
        original_price = selector_obj.xpath(".//div[contains(@class, 'search_price')]/text()").getall()
    return original_price

def clean_discounted_price(discounted_price):
    if discounted_price:
        return discounted_price.strip()
    return discounted_price

def clean_discount_rate(discount_rate):
    if discount_rate:
        return discount_rate.lstrip('-')
    return discount_rate

class SteamItem(scrapy.Item):
    index = scrapy.Field(
        output_processor = TakeFirst()
    )
    game_url = scrapy.Field(
        output_processor = TakeFirst()
    )
    img_url = scrapy.Field(
        output_processor = TakeFirst()
    )
    game_name = scrapy.Field(
        output_processor = TakeFirst()
    )
    release_date = scrapy.Field(
        output_processor = TakeFirst()
    )
    platforms = scrapy.Field(
        input_processor = MapCompose(get_platforms)
    )
    reviews_summary = scrapy.Field(
        input_processor = MapCompose(remove_html),
        output_processor = TakeFirst()
    )
    original_price = scrapy.Field(
        input_processor = MapCompose(get_original_price, str.strip),
        output_processor = Join('')
    )
    discounted_price = scrapy.Field(
        input_processor = MapCompose(clean_discounted_price),
        output_processor = TakeFirst()
    )
    discount_rate = scrapy.Field(
        input_processor = MapCompose(clean_discount_rate),
        output_processor = TakeFirst()
    )
```

##### more_best.py
``` py
import scrapy
from scrapy.selector import Selector
# add Itemloader
from scrapy.loader import ItemLoader
import json
from ..items import SteamItem


class MoreBestSpider(scrapy.Spider):
    name = 'more_best'
    allowed_domains = ['store.steampowered.com']
    offset_index = 0
    INCREASEMENT_COUNT = 50
    ITEM_MAX = 100
    # print game_name + release_date
    item_index = 1

    def start_requests(self):
        page_condition = f"query&start={self.offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
        url = f"https://store.steampowered.com/search/results/?{page_condition}"

        yield scrapy.Request(
            url = url,
            method = "GET",
            callback=self.update_query
        )

    def update_query(self, response):
        steam_item = SteamItem()

        resp_dict = json.loads(response.body)
        html = resp_dict['results_html']
        start_index = resp_dict['start']
        print("==================")
        print(f"start={start_index}, total_count={resp_dict['total_count']} ")
        # print(html)
        # print("==================")
        # with open('index.html', 'w', encoding='utf-8') as f:
        #     f.write(html)

        sel = Selector(text=html)
        games = sel.xpath("//a")
        for game in games:
            # add Itemloader
            loader = ItemLoader(item=SteamItem(), selector=game, response=response)
            # loader.add_css()
            # loader.add_value()
            loader.add_xpath('game_url', ".//@href")
            loader.add_xpath('img_url', ".//div[@class='col search_capsule']/img/@src")
            loader.add_xpath('game_name', ".//span[@class='title']/text()")
            loader.add_xpath('release_date', ".//div[@class='col search_released responsive_secondrow']/text()")
            loader.add_xpath('platforms', ".//span[contains(@class,'platform_img') or @class='VR Supported']/@class")
            loader.add_xpath('reviews_summary', ".//span[contains(@class,'search_review_summary')]/@data-tooltip-html")
            loader.add_xpath('discount_rate', ".//div[contains(@class,'search_discount')]/span/text()")
            loader.add_xpath('original_price', ".//div[contains(@class,'search_price_discount_combined')]")
            loader.add_xpath('discounted_price', "(.//div[contains(@class, 'search_price discounted')]/text())[2]")
            loader.add_value('index', self.item_index)
            self.item_index += 1

            # add Itemloader
            # output
            yield loader.load_item()

        if (start_index + self.INCREASEMENT_COUNT) < self.ITEM_MAX:
            offset_index = start_index + self.INCREASEMENT_COUNT
            print("2 ==================")
            print(f"next offset_index={offset_index}")

            page_condition = f"query&start={offset_index}&count=50&dynamic_data=&sort_by=_ASC&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1"
            url = f"https://store.steampowered.com/search/results/?{page_condition}"
            yield scrapy.Request(
                url = url,
                method = "GET",
                callback=self.update_query
            )
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapy crawl more_best
......
{'game_name': 'Apex Legends™',
 'game_url': 'https://store.steampowered.com/app/1172470/Apex_Legends/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_sm_120.jpg?t=1670431796',
 'index': 1,
 'original_price': 'Free to Play',
 'platforms': ['Windows'],
 'release_date': '4 Nov, 2020',
 'reviews_summary': 'Very Positive84% of the 566,415 user reviews for this '
                    'game are positive.'}
......
{'discount_rate': '10%',
 'discounted_price': 'NT$ 259',
 'game_name': 'Glimmer in Mirror',
 'game_url': 'https://store.steampowered.com/app/1035760/Glimmer_in_Mirror/?snr=1_7_7_7000_150_1',
 'img_url': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1035760/capsule_sm_120.jpg?t=1673319346',
 'index': 25,
 'original_price': 'NT$ 288',
 'platforms': ['Windows'],
 'release_date': '9 Jan, 2023'}
......
```

### [Zillow](https://www.zillow.com/)
#### 1st run
##### generate project & spider
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice>scrapy startproject zillow
New Scrapy project 'zillow', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\108-scrapy-practice\zillow
You can start your first spider with:
    cd zillow
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice>cd zillow
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\zillow>scrapy genspider zillow_houses www.zillow.com
Created spider 'zillow_houses' using template 'basic' in module:
  zillow.spiders.zillow_houses
```

##### settings.py change
``` py
# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'zillow (+http://www.yourdomain.com)'
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'

# Obey robots.txt rules
# disable Obey robots.txt
ROBOTSTXT_OBEY = False

# add download delay
DOWNLOAD_DELAY = 10
```

##### utils.py
``` py
URL = 'https://www.zillow.com/...'
```

##### zillow_houses.py
``` py
import scrapy
from ..utils import URL


class ZillowHousesSpider(scrapy.Spider):
    name = 'zillow_houses'
    allowed_domains = ['www.zillow.com']
    start_urls = [URL]

    def parse(self, response):
        print(response.body)
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\zillow>scrapy crawl zillow_houses
......
```

#### add cookie to headers(It doesn't need, but for test)
##### utils.py
``` py
from http.cookies import SimpleCookie

URL = 'https://www.zillow.com/...'

def cookie_parser():
    cookie_string = 'x-amz-continuous-deployment-state=...'
    cookie = SimpleCookie()
    cookie.load(cookie_string)

    cookies = {}

    # print(cookie.items())
    for key, morsel in  cookie.items():
        cookies[key] = morsel.value

    # print(cookies)
    return cookies

# cookie_parser()
```

##### zillow_houses.py
``` py
import scrapy
from ..utils import URL, cookie_parser


class ZillowHousesSpider(scrapy.Spider):
    name = 'zillow_houses'
    allowed_domains = ['www.zillow.com']

    def start_requests(self):
        yield scrapy.Request(
            url=URL,
            callback=self.parse,
            # this site not need cookie, just try put cookie
            cookies=cookie_parser()
        )

    def parse(self, response):
        with open('initial_response.json', 'wb') as f:
            f.write(response.body)
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\zillow>scrapy crawl zillow_houses
```

##### initial_response.json
``` json
{
    "user": {
        "isLoggedIn": false,
        "email": "",
        "displayName": "",
        "hasHousingConnectorPermission": false,
        "savedSearchCount": 0,
        "savedHomesCount": 0,
        "personalizedSearchGaDataTag": "Home Recs",
        "personalizedSearchTraceID": "63bfac101b43a418c290f126f636f3b8",
        "searchPageRenderedCount": 0,
        "guid": "c77aeb82-e78d-4e30-ae12-99ebf68ee40c",
        "zuid": "",
        "isBot": false,
        "userSpecializedSEORegion": false
    },
    "mapState": {
        "customRegionPolygonWkt": null,
        "schoolPolygonWkt": null,
        "isCurrentLocationSearch": false,
        "userPosition": {
            "lat": null,
            "lon": null
        }
    },
		......
}
```

### Ref
+ [Postman](https://www.postman.com/downloads/)
