import React from "react";
import CountUp from 'react-countup';
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";


let topPosts=[
    {
        "organization": "urn:li:organization:13740206",
        "postId": "6970695267402563584",
        "text": "Your appreciations and advice mean a lot to us. We wish you well-being and happiness on your birthday. Happy birthday to our great Co-Founder & Network Consultant \"MR Ravi Kant Sankhyan\"!\n#birthdayparty #bossbirthday #birthdaycelebration #leapoffaithtechnologies #loftfamily",
        "createdAt": 1661943261156,
        "content": {
            "contentEntities": [
                {
                    "thumbnails": [
                        {
                            "imageSpecificContent": {
                                "width": 800,
                                "height": 800
                            },
                            "resolvedUrl": "https://media.licdn.com/dms/image/v2/C4D22AQF51GRfCFZSEQ/feedshare-shrink_800/feedshare-shrink_800/0/1661943260548?e=1746662400&v=beta&t=24l5yDpS3xplhLIGFvpweDyBOcmgxFNfBteSnHtO60U"
                        }
                    ],
                    "entity": "urn:li:digitalmediaAsset:C4D22AQF51GRfCFZSEQ",
                    "entityLocation": "https://media.licdn.com/dms/image/v2/C4D22AQF51GRfCFZSEQ/feedshare-shrink_800/feedshare-shrink_800/0/1661943260548?e=1746662400&v=beta&t=24l5yDpS3xplhLIGFvpweDyBOcmgxFNfBteSnHtO60U"
                }
            ],
            "shareMediaCategory": "RICH"
        },
        "distribution": {
            "linkedInDistributionTarget": {
                "visibleToGuest": true
            }
        },
        "lifecycleState": "",
        "visibility": "",
        "lastModified": 1661943261203,
        "impressions": 1,
        "clicks": 0,
        "likes": 22,
        "comments": 1,
        "shares": 0,
        "engagementRate": 2300,
        "performanceScore": "1610.00",
        "engagement": 23
    },
    {
        "organization": "urn:li:organization:13740206",
        "postId": "6981147360244428800",
        "text": "Enjoy your day and have a party. May you continue to attain success beyond your wildest imagination! Happy Birthday, Navni Sharma!\n#birthdayboy #birthdaycake #birthdayparty #leapoffaithtechnologies #loftfamily",
        "createdAt": 1664435234331,
        "content": {
            "contentEntities": [
                {
                    "thumbnails": [
                        {
                            "imageSpecificContent": {
                                "width": 800,
                                "height": 800
                            },
                            "resolvedUrl": "https://media.licdn.com/dms/image/v2/C4D22AQFhQGwzSvNJoA/feedshare-shrink_800/feedshare-shrink_800/0/1664435233481?e=1746662400&v=beta&t=PDEFnVjk7k8yJLCXqCIMxQoTDvKs8xTno0Dcw5yazQA"
                        }
                    ],
                    "entity": "urn:li:digitalmediaAsset:C4D22AQFhQGwzSvNJoA",
                    "entityLocation": "https://media.licdn.com/dms/image/v2/C4D22AQFhQGwzSvNJoA/feedshare-shrink_800/feedshare-shrink_800/0/1664435233481?e=1746662400&v=beta&t=PDEFnVjk7k8yJLCXqCIMxQoTDvKs8xTno0Dcw5yazQA"
                }
            ],
            "shareMediaCategory": "RICH"
        },
        "distribution": {
            "linkedInDistributionTarget": {
                "visibleToGuest": true
            }
        },
        "lifecycleState": "",
        "visibility": "",
        "lastModified": 1664435234389,
        "impressions": 1,
        "clicks": 0,
        "likes": 19,
        "comments": 0,
        "shares": 0,
        "engagementRate": 1900,
        "performanceScore": "1330.00",
        "engagement": 19
    },
    {
        "organization": "urn:li:organization:13740206",
        "postId": "6889779872865099776",
        "text": "A wish for you on your birthday, whatever you ask may you receive, whatever you seek may you find, whatever you wish may it be fulfilled on your birthday and always. Happy Birthday Karanbir Singh!\n#birthdaycelebration #birthdayboy #birthday #loftteam #hapinness #leapoffaithtechnologies",
        "createdAt": 1642651527734,
        "content": {
            "contentEntities": [
                {
                    "thumbnails": [
                        {
                            "imageSpecificContent": {
                                "width": 800,
                                "height": 800
                            },
                            "resolvedUrl": "https://media.licdn.com/dms/image/v2/C5622AQEAm5qGpSzzkA/feedshare-shrink_800/feedshare-shrink_800/0/1642651526925?e=1746662400&v=beta&t=sQ_xB7GV8kHF_bBAUu8e25RDe3zmKjOOUY3XOrMziRs"
                        }
                    ],
                    "entity": "urn:li:digitalmediaAsset:C5622AQEAm5qGpSzzkA",
                    "entityLocation": "https://media.licdn.com/dms/image/v2/C5622AQEAm5qGpSzzkA/feedshare-shrink_800/feedshare-shrink_800/0/1642651526925?e=1746662400&v=beta&t=sQ_xB7GV8kHF_bBAUu8e25RDe3zmKjOOUY3XOrMziRs"
                }
            ],
            "shareMediaCategory": "RICH"
        },
        "distribution": {
            "linkedInDistributionTarget": {
                "visibleToGuest": true
            }
        },
        "lifecycleState": "",
        "visibility": "",
        "lastModified": 1642651527788,
        "impressions": 2,
        "clicks": 0,
        "likes": 28,
        "comments": 8,
        "shares": 0,
        "engagementRate": 1800,
        "performanceScore": "1260.00",
        "engagement": 18
    },
    {
        "organization": "urn:li:organization:13740206",
        "postId": "6927831843866038272",
        "text": "The best of your life has yet to come, embrace it, be confident, and embark on a future of limitless possibilities and opportunities. May you have all the love your heart can hold, all the happiness a day can bring, and all the blessings a life can unfold. Happy Birthday Poonam!\n#birthdaycelebration  #birthdaygift #birthdaycake #birthdayfun #leapoffaithtecnologies",
        "createdAt": 1651723824686,
        "content": {
            "contentEntities": [
                {
                    "thumbnails": [
                        {
                            "imageSpecificContent": {
                                "width": 800,
                                "height": 800
                            },
                            "resolvedUrl": "https://media.licdn.com/dms/image/v2/C4D22AQFqnH-xixUKGg/feedshare-shrink_800/feedshare-shrink_800/0/1651723823997?e=1746662400&v=beta&t=Kd5MAbA1B4JJEPfbuCBJEHNd_s5iDjrfLFJMaEhHnN8"
                        }
                    ],
                    "entity": "urn:li:digitalmediaAsset:C4D22AQFqnH-xixUKGg",
                    "entityLocation": "https://media.licdn.com/dms/image/v2/C4D22AQFqnH-xixUKGg/feedshare-shrink_800/feedshare-shrink_800/0/1651723823997?e=1746662400&v=beta&t=Kd5MAbA1B4JJEPfbuCBJEHNd_s5iDjrfLFJMaEhHnN8"
                }
            ],
            "shareMediaCategory": "RICH"
        },
        "distribution": {
            "linkedInDistributionTarget": {
                "visibleToGuest": true
            }
        },
        "lifecycleState": "",
        "visibility": "",
        "lastModified": 1651724170662,
        "impressions": 1,
        "clicks": 0,
        "likes": 15,
        "comments": 2,
        "shares": 0,
        "engagementRate": 1700,
        "performanceScore": "1190.00",
        "engagement": 17
    },
    {
        "organization": "urn:li:organization:13740206",
        "postId": "6982929220268134401",
        "text": "Happy Work Anniversary, Nidhi. You have made this year an absolute success with your hard work and dedication. Thank you for your year of service to the organization.\n#workanniversary #oneyearanniversary #webdesigner #loftfamily #leapoffaithtechnologies",
        "createdAt": 1664860062815,
        "content": {
            "contentEntities": [
                {
                    "thumbnails": [
                        {
                            "imageSpecificContent": {
                                "width": 800,
                                "height": 800
                            },
                            "resolvedUrl": "https://media.licdn.com/dms/image/v2/C4D22AQH3ZoJe3exIxg/feedshare-shrink_800/feedshare-shrink_800/0/1664860061349?e=1746662400&v=beta&t=Sfcjl2Sjs_PB6GtJKUn0e-EHyjOt-JH5SWcDfi-XUaY"
                        }
                    ],
                    "entity": "urn:li:digitalmediaAsset:C4D22AQH3ZoJe3exIxg",
                    "entityLocation": "https://media.licdn.com/dms/image/v2/C4D22AQH3ZoJe3exIxg/feedshare-shrink_800/feedshare-shrink_800/0/1664860061349?e=1746662400&v=beta&t=Sfcjl2Sjs_PB6GtJKUn0e-EHyjOt-JH5SWcDfi-XUaY"
                }
            ],
            "shareMediaCategory": "RICH"
        },
        "distribution": {
            "linkedInDistributionTarget": {
                "visibleToGuest": true
            }
        },
        "lifecycleState": "",
        "visibility": "",
        "lastModified": 1664860062862,
        "impressions": 1,
        "clicks": 0,
        "likes": 15,
        "comments": 0,
        "shares": 0,
        "engagementRate": 1500,
        "performanceScore": "1050.00",
        "engagement": 15
    }
]   

function formatToK(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }
const getPerformanceBar = (performance) => {
  switch (performance) {
    case "high":
      return "bg-green-500 w-3/4";
    case "medium":
      return "bg-blue-500 w-2/4";
    case "low":
      return "bg-gray-500 w-1/4";
    default:
      return "bg-gray-300";
  }
};

const TopPostInsights = () => {
  return (
    <div className="w-full bg-white/50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Top Post Insights</h2>
      <div className="bg-gray-100 rounded-lg ">
        <div className="flex justify-between p-4 rounded-t-lg  bg-gray-300/50 font-semibold w-full text-lg text-gray-700 pb-2 border-b">
          <span className="w-2/5">Post</span>
          <span className="w-1/5">Platform</span>
          <span className="w-1/5 text-center">Engagement</span>
          <span className="w-1/5 text-center">Performance</span>
        </div>

        {topPosts.map((post,i) => (
          <div key={i} className="flex p-4 items-center justify-between py-3 border-b last:border-none">
         
            <div className="flex gap-2 items-center w-2/5">
              <Image src={post.content.contentEntities.thumbnails.resolvedUrl} className="w-14 h-14  bg-gray-300/50 rounded-md"></Image>
              <span className="text-gray-800 text-lg w-1/2">{post.text.split(' ').slice(0,4).join(' ')+'...'}</span>
            </div>

          
            <div className="w-1/5 gap-3 items-center flex">
            <FaLinkedin className="w-10 h-10 text-blue-500" />
            <div className=" text-gray-600 text-xl">Linkdin</div>
            </div>
            

           
            <div className="w-1/5 text-center font-semibold text-gray-700">{formatToK(post.engagementRate)}</div>

            
            <div className="w-1/5 flex justify-center items-center">
            <h2><CountUp end={post.performanceScore} duration={2.5} separator="," /></h2>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPostInsights;
