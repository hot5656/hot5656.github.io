---
title:  Python Scrapy Practice
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


<!--more-->

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

        # print html or write to filw
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

        # print html or write to filw
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


### Ref
+ [Postman](https://www.postman.com/downloads/)
