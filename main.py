#!/usr/bin/env python


#  This software has been developed is property of Tobias Juhasz. 
#  CC0 1.0 Universal License in LICENSE file.

# It's important to notice that the config data will be on configuration.py file.
from configuration import __config__ as cfg
import json
import os, sys, re

class __main__:
    def __init__(self, JSON_FOLDER=None, JSON={}):
        self.json_dict = __main__.read(JSON_FOLDER, JSON)
        
    def read(JSON_FOLDER = "", JSON={}):
        if JSON_FOLDER == None:
            try:
                return JSON
            except:
                print("Unexpected error:", sys.exc_info()[0])
        else:
            with open(os.path.join(sys.path[0], "figmap.json")) as f:
                data = json.loads(f.read())
            return data
    
    # Get the json dict and make a conversion to a JSON based CSS
    def elements_css(self, children=[]):
        json_dict = self.json_dict

        if children != []:
            json_dict = children
            
        for e in json_dict:
            if (e["type"] == "COMPONENT_SET"):
                value = self.elements_css(e["children"])
            else:
                if(e["children"] != []):
                    value = self.elements_css(e["children"])                    
                for attr in e:
                    if attr != "children":
                        print(attr,":", e[attr])
                        
    # Returns a string based on a CSS format from an JSON obj
    # JSON = { '.something || #something':{ 'attribute': 'params' } }
    # Returns = ".something || #something  { attribute: params; }"
    def css_sify(self, obj):
        # I'll take the object and dump it.
        string = json.dumps(obj)
        for e in obj:
            string = json.dumps(e) + json.dumps(obj[e])
            string = re.sub('"', '', re.sub(r'}$', ';}', re.sub(',', ';', string)))
            print(string)
            
        return string
        
    def __attr_list__(self):
        obj = self.json_dict
        for e in obj:
            for attr in e:
                if(attr != "children"):
                    print(attr, e[attr])